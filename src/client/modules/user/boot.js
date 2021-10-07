import App from 'candy-box/app.js';
import 'candy-box-demo/client/modules/user/modules/auth/boot.js';
import usersComponent from 'candy-box-demo/client/modules/user/components/users.vue';
import createUserComponent from 'candy-box-demo/client/modules/user/components/create.vue';
import editUserComponent from 'candy-box-demo/client/modules/user/components/edit.vue';
import { UserRepositorySymbol } from 'candy-box-demo/modules/user/repositories/users.js';
import users from 'candy-box-demo/client/modules/user/repositories/users.js';

App.register(({box}) => {
    box.singleton(UserRepositorySymbol, () => users());
});

App.boot(({router, store}) => {
    router.addRoute({
        component: usersComponent,
        path: '/users',
        name: 'users',
    });
    router.addRoute({
        component: createUserComponent,
        path: '/user/create',
        name: 'user-create',
    });
    router.addRoute({
        component: editUserComponent,
        path: '/user/:id/edit',
        name: 'user-edit',
    });
    store.registerModule('user', {
        namespaced: true,
        state: () => ({}),
    });
});