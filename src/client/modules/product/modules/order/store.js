import Order from 'candy-box-demo/modules/product/modules/order/documents/order.js';
import OrderItem from 'candy-box-demo/modules/product/modules/order/documents/order-item.js';
import orders from 'candy-box-demo/client/modules/product/modules/order/repositories/orders.js';
import Collection from 'candy-box/structures/collection.js';

export default {
    namespaced: true,
    state: () => ({
        order: null,
        items: new Collection(),
    }),
    mutations: {
        update(state, {order, items}) {
            state.order = order;
            state.items.clear();
            state.items.push(...items);
        },
    },
    actions: {
        load({commit, rootGetters}) {
            return orders().getUserCart(rootGetters['user/auth/userId']).then((order) => {
                if (order === null) {
                    order = new Order();
                    order.init();
                }
                commit('update', {
                    order, 
                    items: order.items.value.all(),
                });
            });
        },
        add({commit, state}, {products, qty}) {
            let newItems = [...state.items.all()];
            products.forEach((product) => {
                let index = newItems.findIndex((i) => i.product_id === product.id);
                if (index === -1) {
                    let item = new OrderItem();
                    item.product = product;
                    item.qty = qty;
                    item.price = product.price;
                    newItems.push(item);
                } else {
                    newItems[index].qty += qty;
                }
            });
            return orders().storeCart(state.order, newItems).then((order) => {
                commit('update', {
                    order, 
                    items: newItems,
                });
            });
        },
        remove({commit, state}, {products}) {
            let newItems = state.items.all().filter((item) => {
                return products.every((product) => item.product_id !== product.id);
            });
            return orders().storeCart(state.order, newItems).then((order) => {
                commit('update', {
                    order, 
                    items: newItems,
                });
            });
        },
        checkout({commit, state}) {
            if (state.items.length === 0) {
                return Promise.resolve(false);
            }
            return orders().checkout(state.order).then((result) => {
                if (result === false) {
                    return false;
                }
                commit('update', {
                    order: result, 
                    items: [...state.items.all()],
                });
                return true;
            });
        },
    },
    getters: {
        orderStatus(state) {
            return state.order ? state.order.status : null;
        },
        items(state) {
            return state.items;
        },
        totalPrice(state) {
            return state.items.reduce((sum, item) => sum + item.price * item.qty, 0);
        },
        totalQty(state) {
            return state.items.reduce((sum, item) => sum + item.qty, 0);
        },
    },
}
