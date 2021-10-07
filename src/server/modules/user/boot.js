import App from 'candy-box/app.js';
import { UserRepositorySymbol } from 'candy-box-demo/modules/user/repositories/users.js';
import users from 'candy-box-demo/server/modules/user/repositories/users.js';
import 'candy-box-demo/server/modules/user/modules/auth/boot.js';
import usersMap from 'candy-box-demo/modules/user/requests/users-map.js';
import UserRepositoryProxy from 'candy-box-demo/server/modules/user/repositories/users-proxy.js';
import { server } from 'candy-box/server/base.js';
import { gate } from 'candy-box/auth/auth.js';

App.register(({box}) => {
    box.singleton(UserRepositorySymbol, () => users());
});

App.boot(() => {
    server()
        .map(usersMap(), new UserRepositoryProxy(users()));
    gate()
        .define('users.read', (identity) => {
            return identity.getInstance()
                .then((user) => user.can('users.read'));
        })
        .define('users.write', (identity) => {
            return identity.getInstance()
                .then((user) => user.can('users.write'));
        });
});