<template>
    <page title="Menu">
        <div 
            v-for="category in menu"
            :key="category.category.id"
            class="menu">
            <h3>{{ category.category.name }}</h3>
            <div class="products">
                <div 
                    v-for="product in category.products"
                    :key="product.product.id"
                    class="product">
                    <div class="info">
                        <div class="head">
                            <h4>{{ product.product.name }}</h4>
                            <div 
                                v-if="orderStatus === 'draft' && countInCart(product) !== 0"
                                class="in-cart">
                                In cart: {{ countInCart(product) }}
                                <button @click="remove(product)">&times;</button>
                            </div>
                        </div>
                        <div class="price">Price: ${{ product.product.price.toFixed(2) }}</div>
                        <ul 
                            v-if="product.addons.length !== 0"
                            class="addons">
                            <li
                                v-for="addon in product.addons"
                                :key="addon.id">
                                <label>
                                    <input 
                                        type="checkbox" 
                                        :checked="isAddonSelected(product, addon.id)" 
                                        @change="toggleAddon(product, addon.id, $event)" />
                                    {{ addon.name }} <i>(+ ${{ addon.price.toFixed(2) }})</i>
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div class="order">
                        <form 
                            v-if="orderStatus === 'draft'"
                            @submit.prevent="add(product)">
                            <div class="control">
                                <input type="number" step="1" min="1" v-model="product.qty" />
                            </div>
                            <div class="control">
                                <button type="submit">Add to cart</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </page>
</template>

<script>
import categories from 'candy-box-demo/modules/product/repositories/categories.js';
import errors from 'candy-box-demo/client/mixins/errors.js';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';

export default {
    mixins: [
        errors,
    ],
    computed: mapGetters({
        orderStatus: 'product/cart/orderStatus',
        cartItems: 'product/cart/items',
    }),
    data() {
        return {
            menu: [],
        }
    },
    mounted() {
        categories().menu().then((results) => {
            this.menu = results
                .filter((category) => category.products.value.length !== 0)
                .map((category) => ({
                    category: Object.freeze(category),
                    products: category.products.value.map((product) => ({
                        product: Object.freeze(product),
                        addons: product.addons.value.map((addon) => Object.freeze(addon)),
                        qty: 1,
                        selectedAddons: [],
                    })),
                }));
        });
    },
    methods: {
        add(product) {
            let products = [
                product.product, 
                ...product.addons.filter((addon) => this.isAddonSelected(product, addon.id)),
            ];
            this.addToCart({products, qty: parseInt(product.qty)});
        },
        remove(product) {
            let products = [
                product.product,
                ...product.addons,
            ];
            this.removeFromCart({products});
        },
        isAddonSelected(product, id) {
            return product.selectedAddons.indexOf(id) !== -1;
        },
        toggleAddon(product, id, event) {
            let index = product.selectedAddons.indexOf(id);
            if (index === -1 && event.target.checked) {
                product.selectedAddons.push(id);
            } else if (index !== -1 && !event.target.checked) {
                product.selectedAddons.splice(index, 1);
            }
        },
        countInCart(product) {
            let item = this.cartItems.find((i) => product.product.id === i.product_id);
            return item === undefined ? 0 : item.qty;
        },
        ...mapActions({
            addToCart: 'product/cart/add',
            removeFromCart: 'product/cart/remove',
        }),
    }
}
</script>