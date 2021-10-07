import App from 'candy-box/app.js';
import { ProductRepositorySymbol } from 'candy-box-demo/modules/product/repositories/products.js';
import { CategoryRepositorySymbol } from 'candy-box-demo/modules/product/repositories/categories.js';
import products from 'candy-box-demo/server/modules/product/repositories/products.js';
import categories from 'candy-box-demo/server/modules/product/repositories/categories.js';
import productsMap from 'candy-box-demo/modules/product/requests/products-map.js';
import categoriesMap from 'candy-box-demo/modules/product/requests/categories-map.js';
import ProductRepositoryProxy from 'candy-box-demo/server/modules/product/repositories/products-proxy.js';
import CategoryRepositoryProxy from 'candy-box-demo/server/modules/product/repositories/categories-proxy.js';
import { server } from 'candy-box/server/base.js';
import { gate } from 'candy-box/auth/auth.js';
import 'candy-box-demo/server/modules/product/modules/order/boot.js';

App.register(({box}) => {
    box.singleton(ProductRepositorySymbol, () => products());
    box.singleton(CategoryRepositorySymbol, () => categories());
});

App.boot(() => {
    server()
        .map(productsMap(), new ProductRepositoryProxy(products()))
        .map(categoriesMap(), new CategoryRepositoryProxy(categories()));
    gate()
        .define('products.read', (identity) => {
            return identity.getInstance()
                .then((user) => user.can('products.read'));
        })
        .define('products.write', (identity) => {
            return identity.getInstance()
                .then((user) => user.can('products.write'));
        })
        .define('categories.read', (identity) => {
            return identity.getInstance()
                .then((user) => user.can('categories.read'));
        })
        .define('categories.write', (identity) => {
            return identity.getInstance()
                .then((user) => user.can('categories.write'));
        });
});