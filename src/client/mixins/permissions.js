import { mapGetters } from 'vuex';

export default {
    computed: mapGetters({
        user: 'user/auth/user',
    }),
    methods: {
        $can(action) {
            return this.user !== null && this.user.can(action);
        },
    },
}