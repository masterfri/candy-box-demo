import SqlRepository from 'candy-box/repository/sql.js';
import Order, {
    getOrderMoment,
    OrderStatus } from 'candy-box-demo/modules/product/modules/order/documents/order.js';
import orderItems from 'candy-box-demo/modules/product/modules/order/repositories/order-items.js';

class OrderRepository extends SqlRepository
{
    /**
     * Store order items
     * 
     * @param {Order} order
     * @param {Array} items
     * @returns {Promise}
     */
    storeCart(order, items) {
        return this._ensureOrderStored(order).then(() => {
            return order.items.get().then((currentItems) => {
                let productIds = items.map((item) => item.product_id);
                let remove = currentItems.filter((item) => productIds.indexOf(item.product_id) === -1);
                let store = items.map((item) => {
                    let index = currentItems.findIndex((i) => i.product_id === item.product_id);
                    if (index !== -1) {
                        let current = currentItems.get(index);
                        current.qty = item.qty;
                        return current;
                    }
                    item.order_id = order.id;
                    return item;
                });
                let itemsRepository = orderItems();
                return Promise.all(
                    remove.map((item) => itemsRepository.delete(item.id))
                ).then(() => Promise.all(
                    store.map((item) => itemsRepository.store(item))
                )).then(() => {
                    return order;
                });
            });
        });
    }

    /**
     * Checkout
     * 
     * @param {Order} order
     * @returns {Promise}
     */
    checkout(order) {
        if (order.status === OrderStatus.DRAFT) {
            order.status = OrderStatus.NEW;
            return this.store(order);
        }
        return Promise.resolve(false);
    }

    /**
     * Complete order processing
     * 
     * @param {Order} order
     * @param {Boolean} success
     * @returns {Promise}
     */
    process(order, success) {
        if (order.status === OrderStatus.NEW) {
            order.status = success ? OrderStatus.PROCESSED : OrderStatus.FAILED;
            return this.store(order);
        }
        return Promise.resolve(false);
    }

    /**
     * Get current order with items
     * 
     * @param {Number} userId
     * @returns {Promise}
     */
    getUserCart(userId) {
        let moment = getOrderMoment();
        return this.search({
            ...moment,
            user_id: userId,
        }).then((results) => {
            if (results.length === 0) {
                return null;
            }
            let order = results.first();
            return order.items.get().then(() => order);
        });
    }

    /**
     * Store order if required
     * 
     * @param {Order} order 
     * @returns {Promise}
     */
    _ensureOrderStored(order) {
        if (order.hasKey()) {
            return Promise.resolve();
        }
        return this.store(order);
    }
}

const orders = () => new OrderRepository(Order, 'orders');

export default orders;