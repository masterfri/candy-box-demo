<template>
    <header>
        <h1>Candy box demo!</h1>
        <nav 
            v-if="isLoggedIn">
            <div class="pages">
                <router-link 
                    v-if="$can('users.read')"
                    :to="{name: 'users'}">
                    Users
                </router-link>
                <router-link 
                    v-if="$can('products.read')"
                    :to="{name: 'products'}">
                    Products
                </router-link>
                <router-link 
                    :to="{name: 'menu'}">
                    Menu
                </router-link>
            </div>
            <div class="userbar">
                <span>Hello, {{ userName }}!</span>
                <cart />
                <a 
                    href="#"
                    @click.prevent="logout">
                    Logout
                </a>
            </div>
        </nav>
    </header>
    <ul 
        class="error"
        v-if="hasErrors">
        <li 
            v-for="error in errors"
            :key="error.index">
            {{ error.error }}
        </li>
    </ul>
    <main>
        <router-view :key="$route.path" />
    </main>
    <footer>
        Powered with 
        <a target="_blank" href="https://github.com/masterfri/candy-box">candy-box</a>.
    </footer>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
    computed: mapGetters({
        userName: 'user/auth/userName',
        isLoggedIn: 'user/auth/isLoggedIn',
        errors: 'errors',
        hasErrors: 'hasErrors',
    }),
    methods: {
        ...mapActions({
            autologin: 'user/auth/autologin',
            doLogout: 'user/auth/logout',
            loadCart: 'product/cart/load',
        }),
        logout() {
            this.doLogout();
            this.$router.push({name: 'login'});
        },
    },
    mounted() {
        this.autologin().then((loggedIn) => {
            if (!loggedIn) {
                this.$router.push({name: 'login'});
            } else {
                this.loadCart();
            }
        });
    },
}
</script>