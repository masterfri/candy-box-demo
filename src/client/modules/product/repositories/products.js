import RestRepository from 'candy-box/repository/rest.js';
import Product from 'candy-box-demo/modules/product/documents/product.js';
import productsMap from 'candy-box-demo/modules/product/requests/products-map.js';

const products = () => new RestRepository(Product, productsMap());

export default products;