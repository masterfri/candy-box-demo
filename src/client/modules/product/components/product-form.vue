<template>
    <form 
        action="javascript:;"
        @submit.prevent="save">
        <div class="control">
            <label>Name</label>
            <input v-model="doc.name" />
            <ul 
                v-if="$error('name')"
                class="errors">
                <li 
                    v-for="(error, index) in $error('name')"
                    :key="index">
                    {{ error }}
                </li>
            </ul>
        </div>
        <div class="control">
            <label>Category</label>
            <select v-model="doc.category_id">
                <option 
                    :value="null"
                    :selected="doc.category_id === null">
                    ---
                </option>
                <option 
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                    :selected="doc.category_id === category.id">
                    {{ category.name }}
                </option>
            </select>
            <ul 
                v-if="$error('category_id')"
                class="errors">
                <li 
                    v-for="(error, index) in $error('category_id')"
                    :key="index">
                    {{ error }}
                </li>
            </ul>
        </div>
        <div class="control">
            <label>Price</label>
            <input type="number" v-model="doc.price" />
            <ul 
                v-if="$error('price')"
                class="errors">
                <li 
                    v-for="(error, index) in $error('price')"
                    :key="index">
                    {{ error }}
                </li>
            </ul>
        </div>
        <div class="control">
            <label>
                <input 
                    type="checkbox" 
                    v-model="doc.available" /> 
                    Available
                </label>
            <ul 
                v-if="$error('available')"
                class="errors">
                <li 
                    v-for="(error, index) in $error('available')"
                    :key="index">
                    {{ error }}
                </li>
            </ul>
        </div>
        <div class="control">
            <button type="submit">Save</button>
        </div>
    </form>
</template>

<script>
import errors from 'candy-box-demo/client/mixins/errors.js';
import products from 'candy-box-demo/modules/product/repositories/products.js';
import categories from 'candy-box-demo/modules/product/repositories/categories.js';

export default {
    mixins: [
        errors,
    ],
    props: {
        doc: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            categories: []
        }
    },
    mounted() {
        categories().search({}).then((list) => {
            this.categories = list;
        });
    },
    methods: {
        save() {
            products().store(this.doc).then(() => {
                if (this.doc.parent_id !== null) {
                    this.$router.push({name: 'product-addons', params: {id: this.doc.parent_id}});
                } else {
                    this.$router.push({name: 'products'});
                }
            }).catch((error) => {
                this.$catchErrors(error);
            });
        },
    },
}
</script>