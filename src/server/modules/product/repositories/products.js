import SqlRepository from 'candy-box/repository/sql.js';
import Product from 'candy-box-demo/modules/product/documents/product.js';

const products = () => new SqlRepository(Product, 'products');

export default products;