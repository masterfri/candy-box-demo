<template>
    <page 
        title="Login">
        <form 
            action="javascript:;"
            @submit.prevent="login">
            <div class="control">
                <label>Username</label>
                <input v-model="username" />
                <ul 
                    v-if="$error('login')"
                    class="errors">
                    <li 
                        v-for="(error, index) in $error('login')"
                        :key="index">
                        {{ error }}
                    </li>
                </ul>
            </div>
            <div class="control">
                <label>Password</label>
                <input type="password" v-model="password" />
                <ul 
                    v-if="$error('password')"
                    class="errors">
                    <li 
                        v-for="(error, index) in $error('password')"
                        :key="index">
                        {{ error }}
                    </li>
                </ul>
            </div>
            <div class="control">
                <button type="submit">Login</button>
            </div>
        </form>
    </page>
</template>

<script>
import { mapActions } from 'vuex';
import errors from 'candy-box-demo/client/mixins/errors.js';

export default {
    mixins: [
        errors,
    ],
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        login() {
            let {username, password} = this;
            this.$clearErrors();
            this.doLogin({login: username, password})
                .then(() => {
                    this.$router.push({name: 'home'});
                })
                .catch((err) => {
                    this.$catchErrors(err);
                });
        },
        ...mapActions({
            doLogin: 'user/auth/login',
        }),
    },
}
</script>