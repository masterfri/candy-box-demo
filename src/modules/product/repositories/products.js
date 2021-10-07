import App from 'candy-box/app.js';

const ProductRepositorySymbol = Symbol('ProductRepository');
const products = () => App.make(ProductRepositorySymbol);

export default products;

export {
    ProductRepositorySymbol,
}