import App from 'candy-box/app.js';

const OrderRepositorySymbol = Symbol('OrderRepository');
const orders = () => App.make(OrderRepositorySymbol);

export default orders;

export {
    OrderRepositorySymbol,
}