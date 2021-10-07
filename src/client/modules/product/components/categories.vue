<template>
    <page 
        title="Categories">
        <nav>
            <router-link 
                v-if="$can('categories.write')"
                :to="{name: 'category-create'}">
                Create
            </router-link>
            <router-link 
                v-if="$can('products.read')"
                :to="{name: 'products'}">
                Products
            </router-link>
        </nav>
        <dataset 
            ref="dataset"
            :repository="categories">
            <template v-slot:header>
                <th>Name</th>
                <th></th>
            </template>
            <template v-slot:row="row">
                <td>
                    {{ row.name }}
                </td>
                <td class="actions">
                    <template v-if="$can('categories.write')">
                        <router-link :to="{name: 'category-edit', params: {id: row.id}}">
                            Edit
                        </router-link>
                        <a 
                            href="#"
                            class="danger"
                            @click.prevent="remove(item)">
                            Delete
                        </a>
                    </template>
                </td>
            </template>
        </dataset>
    </page>
</template>

<script>
import categories from 'candy-box-demo/modules/product/repositories/categories.js';
import errors from 'candy-box-demo/client/mixins/errors.js';

export default {
    mixins: [
        errors,
    ],
    data() {
        return {
            categories: categories(),
        }
    },
    methods: {
        remove(category) {
            if (confirm('Are you sure you want to delete category "' + category.name + '" ?')) {
                categories().delete(category.id).then(() => {
                    this.$refs.dataset.refresh(false);
                }).catch((error) => {
                    this.$catchErrors(error);
                });
            }
        }
    }
}
</script>