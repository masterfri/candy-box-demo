import RepositoryRequestMap from 'candy-box/repository/request-map.js';
import { Method } from 'candy-box/transport/request.js';

const ordersMap = () => {
    let mapping = new RepositoryRequestMap('/api/orders');
    mapping.map('storeCart', {
        route: '/api/orders/:id/items',
        method: Method.PUT,
    });
    mapping.map('checkout', {
        route: '/api/orders/:id/checkout',
        method: Method.POST,
    });
    mapping.map('process', {
        route: '/api/orders/:id/process/:status',
        method: Method.POST,
    });
    mapping.map('getUserCart', {
        route: '/api/cart/:id',
        method: Method.GET,
    });
    return mapping;
}

export default ordersMap;