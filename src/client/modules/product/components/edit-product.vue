<template>
    <page 
        title="Edit product">
        <product-form 
            v-if="doc !== null"
            :doc="doc" />
    </page>
</template>

<script>
import products from 'candy-box-demo/modules/product/repositories/products.js';
import productForm from 'candy-box-demo/client/modules/product/components/product-form.vue';

export default {
    components: {
        productForm,
    },
    data() {
        return {
            doc: null,
        }
    },
    mounted() {
        products().get(this.$route.params.id).then((doc) => {
            this.doc = doc;
        }).catch((error) => {
            this.$catchErrors(error);
        });
    },
}
</script>