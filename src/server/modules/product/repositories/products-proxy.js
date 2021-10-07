import RepositoryProxy from 'candy-box/repository/proxy.js';

class ProductRepositoryProxy extends RepositoryProxy
{
    constructor(repository) {
        super(repository);
        this.protectRead('products.read');
        this.protectWrite('products.write');
    }
}

export default ProductRepositoryProxy;