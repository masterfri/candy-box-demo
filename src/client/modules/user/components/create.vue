<template>
    <page 
        title="New user">
        <user-form :doc="doc" />
    </page>
</template>

<script>
import User from 'candy-box-demo/modules/user/documents/user.js';
import userForm from 'candy-box-demo/client/modules/user/components/form.vue';

export default {
    components: {
        userForm,
    },
    data() {
        return {
            doc: new User({
                role: 'customer',
            }),
        }
    }
}
</script>