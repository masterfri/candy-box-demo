import SqlRepository from 'candy-box/repository/sql.js';
import OrderItem from 'candy-box-demo/modules/product/modules/order/documents/order-item.js';

const orderItems = () => new SqlRepository(OrderItem, 'order_items');

export default orderItems;