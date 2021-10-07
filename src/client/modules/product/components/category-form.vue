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
            <button type="submit">Save</button>
        </div>
    </form>
</template>

<script>
import errors from 'candy-box-demo/client/mixins/errors.js';
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
    methods: {
        save() {
            categories().store(this.doc).then(() => {
                this.$router.push({name: 'categories'});
            }).catch((error) => {
                this.$catchErrors(error);
            });
        },
    },
}
</script>