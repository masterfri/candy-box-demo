import App from 'candy-box/app.js';
import Validator, {
    ValidatorSymbol } from 'candy-box/validation/validator.js'; 
import Crypto, {
    CryptoSymbol } from 'candy-box/security/crypto.js';
import Webtoken, {
    WebtokenSymbol } from 'candy-box/security/webtoken.js';
import { ServerSymbol } from 'candy-box/server/base.js';
import HttpServer from 'candy-box/server/http.js';
import { SqlClientSymbol } from 'candy-box/sql/base-client.js';
import MysqlClient from 'candy-box/sql/mysql-client.js';
import Logger, {
    LoggerSymbol } from 'candy-box/logging/logger.js';
import { gate } from 'candy-box/auth/auth.js';
import config from './config.js';
import 'candy-box-demo/server/modules/user/boot.js';
import 'candy-box-demo/server/modules/product/boot.js';

App.configure(config);
App.register(({box, config}) => {
    box.factory(ValidatorSymbol, () => new Validator());
    box.singleton(CryptoSymbol, () => new Crypto(config.crypto));
    box.singleton(WebtokenSymbol, () => new Webtoken(config.webtoken));
    box.singleton(ServerSymbol, () => new HttpServer(config.server));
    box.singleton(SqlClientSymbol, () => new MysqlClient(config.db));
    box.singleton(LoggerSymbol, () => new Logger(config.logger));
});

App.boot(() => {
    gate()
        .define('admin', (identity) => {
            return identity.getInstance()
                .then((user) => user.role === 'admin');
        })
        .define('manager', (identity) => {
            return identity.getInstance()
                .then((user) => user.role === 'manager');
        })
        .define('delivery', (identity) => {
            return identity.getInstance()
                .then((user) => user.role === 'delivery');
        })
        .define('customer', (identity) => {
            return identity.getInstance()
                .then((user) => user.role === 'customer');
        });
});