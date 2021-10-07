import RestRepository from 'candy-box/repository/rest.js';
import Order, {
    OrderStatus } from 'candy-box-demo/modules/product/modules/order/documents/order.js';
import ordersMap from 'candy-box-demo/modules/product/modules/order/requests/orders-map.js';
import { isObject } from 'candy-box/helpers.js';

class OrderRepository extends RestRepository
{
    /**
     * Store order items
     * 
     * @param {Order} order
     * @param {Array} items
     * @returns {Promise}
     */
    storeCart(order, items) {
        return this._request('storeCart', {
            id: order.id, 
            items: items.map((item) => item.export()),
        }).then((result) => {
            return this._makeDocument(result);
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
            return this._request('checkout', {
                id: order.id, 
            }).then((result) => {
                return this._makeDocument(result);
            });
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
            return this._request('process', {
                id: order.id, 
                status: success ? OrderStatus.PROCESSED : OrderStatus.FAILED,
            }).then((result) => {
                return this._makeDocument(result);
            });
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
        return this._request('getUserCart', {
            id: userId,
        }).then((result) => {
            return isObject(result) ? this._makeDocument(result) : null;
        });
    }
}

const orders = () => new OrderRepository(Order, ordersMap());

export default orders;