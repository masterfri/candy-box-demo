import App from 'candy-box/app.js';
import productsComponent from 'candy-box-demo/client/modules/product/components/products.vue';
import createProductComponent from 'candy-box-demo/client/modules/product/components/create-product.vue';
import editProductComponent from 'candy-box-demo/client/modules/product/components/edit-product.vue';
import categoriesComponent from 'candy-box-demo/client/modules/product/components/categories.vue';
import createCategoryComponent from 'candy-box-demo/client/modules/product/components/create-category.vue';
import editCategoryComponent from 'candy-box-demo/client/modules/product/components/edit-category.vue';
import menuComponent from 'candy-box-demo/client/modules/product/components/menu.vue';
import { ProductRepositorySymbol } from 'candy-box-demo/modules/product/repositories/products.js';
import { CategoryRepositorySymbol } from 'candy-box-demo/modules/product/repositories/categories.js';
import products from 'candy-box-demo/client/modules/product/repositories/products.js';
import categories from 'candy-box-demo/client/modules/product/repositories/categories.js';
import 'candy-box-demo/client/modules/product/modules/order/boot.js';

App.register(({box}) => {
    box.singleton(ProductRepositorySymbol, () => products());
    box.singleton(CategoryRepositorySymbol, () => categories());
});

App.boot(({router, store}) => {
    router.addRoute({
        component: productsComponent,
        path: '/products',
        name: 'products',
    });
    router.addRoute({
        component: createProductComponent,
        path: '/product/create',
        name: 'product-create',
    });
    router.addRoute({
        component: editProductComponent,
        path: '/product/:id/edit',
        name: 'product-edit',
    });
    router.addRoute({
        component: productsComponent,
        path: '/product/:id/addons',
        name: 'product-addons',
    });
    router.addRoute({
        component: createProductComponent,
        path: '/product/:id/addons/create',
        name: 'product-addon-create',
    });
    router.addRoute({
        component: categoriesComponent,
        path: '/categories',
        name: 'categories',
    });
    router.addRoute({
        component: createCategoryComponent,
        path: '/category/create',
        name: 'category-create',
    });
    router.addRoute({
        component: editCategoryComponent,
        path: '/category/:id/edit',
        name: 'category-edit',
    });
    router.addRoute({
        component: menuComponent,
        path: '/menu',
        name: 'menu',
    });
    store.registerModule('product', {
        namespaced: true,
        state: () => ({}),
    });
});