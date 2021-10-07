<template>
    <page 
        title="Edit user">
        <user-form 
            v-if="doc !== null"
            :doc="doc" />
    </page>
</template>

<script>
import users from 'candy-box-demo/modules/user/repositories/users.js';
import userForm from 'candy-box-demo/client/modules/user/components/form.vue';

export default {
    components: {
        userForm,
    },
    data() {
        return {
            doc: null,
        }
    },
    mounted() {
        users().get(this.$route.params.id).then((doc) => {
            this.doc = doc;
        }).catch((error) => {
            this.$catchErrors(error);
        });
    },
}
</script>