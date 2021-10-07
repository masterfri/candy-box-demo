import App from 'candy-box/app.js';
import ordersComponent from 'candy-box-demo/client/modules/product/modules/order/components/orders.vue';
import cartComponent from 'candy-box-demo/client/modules/product/modules/order/components/cart.vue';
import cartWidgetComponent from 'candy-box-demo/client/modules/product/modules/order/components/cart-widget.vue';
import { OrderRepositorySymbol } from 'candy-box-demo/modules/product/modules/order/repositories/orders.js';
import { OrderItemRepositorySymbol } from 'candy-box-demo/modules/product/modules/order/repositories/order-items.js';
import orders from 'candy-box-demo/client/modules/product/modules/order/repositories/orders.js';
import orderItems from 'candy-box-demo/client/modules/product/modules/order/repositories/order-items.js';
import cartModule from 'candy-box-demo/client/modules/product/modules/order/store.js';

App.register(({box, app}) => {
    box.singleton(OrderRepositorySymbol, () => orders());
    box.singleton(OrderItemRepositorySymbol, () => orderItems());
    app.component('cart', cartWidgetComponent);
});

App.boot(({router, store}) => {
    router.addRoute({
        component: ordersComponent,
        path: '/orders',
        name: 'orders',
    });
    router.addRoute({
        component: cartComponent,
        path: '/cart',
        name: 'cart',
    });
    store.registerModule(['product', 'cart'], cartModule);
}, 100);