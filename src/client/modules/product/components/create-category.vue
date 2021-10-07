<template>
    <page 
        title="New category">
        <category-form :doc="doc" />
    </page>
</template>

<script>
import Category from 'candy-box-demo/modules/product/documents/category.js';
import categoryForm from 'candy-box-demo/client/modules/product/components/category-form.vue';

export default {
    components: {
        categoryForm,
    },
    data() {
        return {
            doc: new Category(),
        }
    }
}
</script>