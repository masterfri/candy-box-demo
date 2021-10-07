<template>
    <page 
        :title="title">
        <nav v-if="isAddons">
            <router-link 
                v-if="$can('products.write')"
                :to="{name: 'product-addon-create'}">
                Create
            </router-link>
            <router-link 
                :to="{name: 'products'}">
                Back to products
            </router-link>
        </nav>
        <nav v-else>
            <router-link 
                v-if="$can('products.write')"
                :to="{name: 'product-create'}">
                Create
            </router-link>
            <router-link 
                v-if="$can('categories.read')"
                :to="{name: 'categories'}">
                Categories
            </router-link>
        </nav>
        <dataset 
            ref="dataset"
            :repository="products"
            :query="query"
            :relations="['category']">
            <template v-slot:header>
                <th>Name</th>
                <th>Category</th>
                <th class="number">Price</th>
                <th>Available</th>
                <th></th>
            </template>
            <template v-slot:row="row">
                <td>
                    {{ row.name }}
                </td>
                <td>
                    {{ categoryName(row) }}
                </td>
                <td class="number">
                    {{ row.price.toFixed(2) }}
                </td>
                <td>
                    {{ row.available ? 'Yes' : '-' }}
                </td>
                <td class="actions">
                    <router-link 
                        v-if="!isAddons"
                        :to="{name: 'product-addons', params: {id: row.id}}">
                        Addons
                    </router-link>
                    <template v-if="$can('products.write')">
                        <router-link :to="{name: 'product-edit', params: {id: row.id}}">
                            Edit
                        </router-link>
                        <a 
                            href="#"
                            class="danger"
                            @click.prevent="remove(row)">
                            Delete
                        </a>
                    </template>
                </td>
            </template>
        </dataset>
    </page>
</template>

<script>
import products from 'candy-box-demo/modules/product/repositories/products.js';
import errors from 'candy-box-demo/client/mixins/errors.js';
import { get } from 'candy-box/helpers.js';
import Query from 'candy-box/query/query.js';

export default {
    mixins: [
        errors,
    ],
    computed: {
        isAddons() {
            return this.$route.params.id !== undefined;
        },
        title() {
            if (this.isAddons) {
                return 'Addons' + (this.parent === null ? '' : ` for "${this.parent.name}"`);
            } else {
                return 'Products';
            }
        }
    },
    data() {
        return {
            products: products(),
            parent: null,
            query: () => {
                let query = new Query();
                query.where((where) => {
                    if (this.isAddons) {
                        where.eq('parent_id', this.$route.params.id);
                    } else {
                        where.eq('parent_id', null);
                    }
                });
                return query;
            }
        }
    },
    mounted() {
        if (this.isAddons) {
            products().get(this.$route.params.id).then((result) => {
                this.parent = Object.freeze(result);
            });
        }
    },
    methods: {
        remove(product) {
            if (confirm('Are you sure you want to delete product "' + product.name + '" ?')) {
                products().delete(product.id).then(() => {
                    this.$refs.dataset.refresh(false);
                }).catch((error) => {
                    this.$catchErrors(error);
                });
            }
        },
        categoryName(product) {
            return get(product, 'category.value.name', '-');
        },
    }
}
</script>