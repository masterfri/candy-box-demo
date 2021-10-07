<template>
    <page 
        title="New product">
        <product-form :doc="doc" />
    </page>
</template>

<script>
import Product from 'candy-box-demo/modules/product/documents/product.js';
import productForm from 'candy-box-demo/client/modules/product/components/product-form.vue';

export default {
    components: {
        productForm,
    },
    data() {
        return {
            doc: new Product(this.$route.params.id === undefined ? {} : {parent_id: this.$route.params.id}),
        }
    },
}
</script>