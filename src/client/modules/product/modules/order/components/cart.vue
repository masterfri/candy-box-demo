<template>
    <page 
        title="Your cart">
        <div 
            v-if="orderStatus === 'new'"
            class="message">
            Your order is waiting for processing...
        </div>
        <div 
            v-else-if="orderStatus === 'processed'"
            class="message">
            Your order has been fulfilled!
        </div>
        <div 
            v-else-if="orderStatus === 'failed'"
            class="message alert">
            Your order was discarded!
        </div>
        <table class="dataset">
            <thead>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Sum</th>
                <th v-if="orderStatus === 'draft'"></th>
            </thead>
            <tbody>
                <tr
                    v-for="item in cartItems"
                    :key="item.id"
                    class="item">
                    <td>
                        {{ productName(item) }}
                    </td>
                    <td>
                        {{ item.price.toFixed(2) }}
                    </td>
                    <td>
                        {{ item.qty }}
                    </td>
                    <td>
                        {{ (item.qty * item.price).toFixed(2) }}
                    </td>
                    <td 
                        v-if="orderStatus === 'draft'"
                        class="actions">
                        <a 
                            href="#"
                            @click.prevent="remove(item)">
                            Remove
                        </a>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <th colspan="3">Total</th>
                <th colspan="2">${{ this.totalPrice.toFixed(2) }}</th>
            </tfoot>
        </table>
        <button 
            v-if="orderStatus === 'draft' && totalQty !== 0"
            @click="checkout">
            Checkout
        </button>
    </page>
</template>

<script>
import errors from 'candy-box-demo/client/mixins/errors.js';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import { get } from 'candy-box/helpers.js';

export default {
    mixins: [
        errors,
    ],
    computed: mapGetters({
        orderStatus: 'product/cart/orderStatus',
        cartItems: 'product/cart/items',
        totalPrice: 'product/cart/totalPrice',
        totalQty: 'product/cart/totalQty',
    }),
    methods: {
        remove(item) {
            let products = [];
            this.cartItems.forEach((i) => {
                let product = i.product.value;
                if (item.product_id === product.id || item.product_id === product.parent_id) {
                    products.push(product);
                }
            });
            this.removeFromCart({products});
        },
        productName(item) {
            return get(item, 'product.value.name', '-');
        },
        checkout() {
            this.doCheckout().then(() => {

            });
        },
        ...mapActions({
            removeFromCart: 'product/cart/remove',
            doCheckout: 'product/cart/checkout',
        }),
    },
}
</script>