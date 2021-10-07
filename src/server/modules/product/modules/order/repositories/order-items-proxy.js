import RepositoryProxy from 'candy-box/repository/proxy.js';

class OrderItemRepositoryProxy extends RepositoryProxy
{
    constructor(repository) {
        super(repository);
        this.protectRead('order-items.read');
        this.protectWrite('order-items.write');
    }
}

export default OrderItemRepositoryProxy;