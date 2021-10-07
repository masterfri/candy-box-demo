<template>
    <page 
        title="Edit category">
        <category-form 
            v-if="doc !== null"
            :doc="doc" />
    </page>
</template>

<script>
import categories from 'candy-box-demo/modules/product/repositories/categories.js';
import categoryForm from 'candy-box-demo/client/modules/product/components/category-form.vue';

export default {
    components: {
        categoryForm,
    },
    data() {
        return {
            doc: null,
        }
    },
    mounted() {
        categories().get(this.$route.params.id).then((doc) => {
            this.doc = doc;
        }).catch((error) => {
            this.$catchErrors(error);
        });
    },
}
</script>