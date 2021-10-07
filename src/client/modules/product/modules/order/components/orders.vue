<template>
    <page 
        title="Orders">
        <dataset 
            ref="dataset"
            :repository="orders">
            <template v-slot:header>
                <th>Name</th>
                <th>Status</th>
                <th>Item</th>
                <th>Qty</th>
                <th></th>
            </template>
            <template v-slot:row="row">
                <td>
                    {{ row.name }}
                </td>
                <td class="actions">
                    <template v-if="$can('orders.write')">
                        <a 
                            href="#"
                            @click.prevent="fulfill(item)">
                            Fulfill
                        </a>
                    </template>
                </td>
            </template>
        </dataset>
    </page>
</template>

<script>
import orders from 'candy-box-demo/modules/product/modules/order/repositories/orders.js';
import errors from 'candy-box-demo/client/mixins/errors.js';

export default {
    mixins: [
        errors,
    ],
    data() {
        return {
            orders: orders(),
        }
    },
    methods: {
        fulfill(order) {
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