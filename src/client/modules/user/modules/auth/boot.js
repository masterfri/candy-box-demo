import App from 'candy-box/app.js';
import login from 'candy-box-demo/client/modules/user/modules/auth/components/login.vue';
import storeModule from 'candy-box-demo/client/modules/user/modules/auth/store.js';

App.boot(({router, store}) => {
    router.addRoute({
        component: login,
        path: '/auth/login',
        name: 'login',
    });
    store.registerModule(['user', 'auth'], storeModule);
}, 100);