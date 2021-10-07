import RestRepository from 'candy-box/repository/rest.js';
import OrderItem from 'candy-box-demo/modules/product/modules/order/documents/order-item.js';
import orderItemsMap from 'candy-box-demo/modules/product/modules/order/requests/order-items-map.js';

const orderItems = () => new RestRepository(OrderItem, orderItemsMap());

export default orderItems;