import { ValidationError } from 'candy-box/validation/validator.js';
import { is } from 'candy-box/helpers.js';

export default {
    data() {
        return {
            errors: null,
        }
    },
    methods: {
        $error(key) {
            if (this.errors !== null) {
                return this.errors[key];
            }
        },
        $catchErrors(error) {
            if (is(error, ValidationError)) {
                this.errors = error.errors;
            } else {
                this.$store.dispatch('catchError', error);
            }
        },
        $clearErrors() {
            this.errors = null;
        },
    },
}