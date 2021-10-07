import App from 'candy-box/app.js';

const OrderItemRepositorySymbol = Symbol('OrderItemRepository');
const orderItems = () => App.make(OrderItemRepositorySymbol);

export default orderItems;

export {
    OrderItemRepositorySymbol,
}