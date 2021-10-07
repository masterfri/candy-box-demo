import App from 'candy-box/app.js';
import { OrderRepositorySymbol } from 'candy-box-demo/modules/product/modules/order/repositories/orders.js';
import { OrderItemRepositorySymbol } from 'candy-box-demo/modules/product/modules/order/repositories/order-items.js';
import orders from 'candy-box-demo/server/modules/product/modules/order/repositories/orders.js';
import orderItems from 'candy-box-demo/server/modules/product/modules/order/repositories/order-items.js';
import ordersMap from 'candy-box-demo/modules/product/modules/order/requests/orders-map.js';
import orderItemsMap from 'candy-box-demo/modules/product/modules/order/requests/order-items-map.js';
import OrderRepositoryProxy from 'candy-box-demo/server/modules/product/modules/order/repositories/orders-proxy.js';
import OrderItemRepositoryProxy from 'candy-box-demo/server/modules/product/modules/order/repositories/order-items-proxy.js';
import { server } from 'candy-box/server/base.js';
import { gate } from 'candy-box/auth/auth.js';

App.register(({box}) => {
    box.singleton(OrderRepositorySymbol, () => orders());
    box.singleton(OrderItemRepositorySymbol, () => orderItems());
});

App.boot(() => {
    server()
        .map(ordersMap(), new OrderRepositoryProxy(orders()))
        .map(orderItemsMap(), new OrderItemRepositoryProxy(orderItems()));
    gate()
        .define('orders.put', (identity, _req, order) => {
            return identity.getInstance()
                .then((user) => {
                    if (user.can('orders.put')) {
                        if (order.hasKey()) {
                            return order.user_id === user.id;
                        }
                        order.user_id = user.id;
                        return true;
                    }
                    return false;
                });
        })
        .define('orders.checkout', (identity, _req, order) => {
            return identity.getInstance()
                .then((user) => {
                    if (user.can('orders.checkout')) {
                        return order.user_id === user.id;
                    }
                    return false;
                });
        })
        .define('orders.process', (identity) => {
            return identity.getInstance()
                .then((user) => user.can('orders.process'));
        })
        .define('orders.cart', (identity) => {
            return identity.getInstance()
                .then((user) => user.can('orders.cart'));
        })
        .define('orders.read', (identity) => {
            return identity.getInstance()
                .then((user) => user.can('orders.read'));
        })
        .define('orders.write', (identity) => {
            return identity.getInstance()
                .then((user) => user.can('orders.write'));
        })
        .define('order-items.read', (identity) => {
            return identity.getInstance()
                .then((user) => user.can('order-items.read'));
        })
        .define('order-items.write', (identity) => {
            return identity.getInstance()
                .then((user) => user.can('order-items.write'));
        });
});