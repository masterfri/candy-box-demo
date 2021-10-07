import RepositoryProxy from 'candy-box/repository/proxy.js';
import orders from 'candy-box-demo/modules/product/modules/order/repositories/orders.js';
import OrderItem from 'candy-box-demo/modules/product/modules/order/documents/order-item.js';
import { OrderStatus } from 'candy-box-demo/modules/product/modules/order/documents/order.js';

class OrderRepositoryProxy extends RepositoryProxy
{
    constructor(repository) {
        super(repository);
        this.protectRead('orders.read');
        this.protectWrite('orders.write');
        this.protect('storeCart', 'orders.put');
        this.protect('checkout', 'orders.checkout');
        this.protect('process', 'orders.process');
        this.protect('getUserCart', 'orders.cart');
    }

    /**
     * Forwarding to "storeCart" method of repository
     * 
     * @param {Request} request 
     * @returns {Promise}
     */
    storeCart(request) {
        return this._proxyMethod(
            request,
            'storeCart', 
            [
                () => {
                    let id = this._pullParam(request, 'id', true);
                    if (id === null) {
                        return orders().newDocument().init();
                    }
                    return orders().get(id);
                },
                () => request.get('items').map((item) => new OrderItem(item)),
            ], 
            (order) => this._serializeDocument(order),
        );
    }

    /**
     * Forwarding to "checkout" method of repository
     * 
     * @param {Request} request 
     * @returns {Promise}
     */
    checkout(request) {
        return this._proxyMethod(
            request,
            'checkout', 
            [
                () => orders().get(this._pullParam(request, 'id')),
            ], 
            (order) => this._serializeDocument(order),
        );
    }

    /**
     * Forwarding to "process" method of repository
     * 
     * @param {Request} request 
     * @returns {Promise}
     */
    process(request) {
        return this._proxyMethod(
            request,
            'process', 
            [
                () => orders().get(this._pullParam(request, 'id')),
                () => this._pullParam(request, 'status') === OrderStatus.PROCESSED,
            ], 
            (order) => this._serializeDocument(order),
        );
    }

    /**
     * Forwarding to "getUserCart" method of repository
     * 
     * @param {Request} request 
     * @returns {Promise}
     */
    getUserCart(request) {
        return this._proxyMethod(
            request,
            'getUserCart', 
            [
                () => this._pullParam(request, 'id')
            ], 
            (results) => this._serializeCart(results)
        );
    }

    /**
     * Serialize cart contents
     * 
     * @param {Order} order 
     * @returns {Object}
     */
    _serializeCart(order) {
        return order === null ? null : {
            ...order.export(),
            items: order.items.export((item) => {
                return {
                    ...item.export(),
                    product: item.product.export(),
                };
            }),
        };
    }
}

export default OrderRepositoryProxy;