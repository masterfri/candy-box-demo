import RepositoryRequestMap from 'candy-box/repository/request-map.js';
import Request, {
    Method } from 'candy-box/transport/request.js';

class StoreProductRequest extends Request
{
    method() {
        return Method.PUT;
    }

    route() {
        return '/api/products';
    }

    validation() {
        return {
            name: this.validator()
                .required()
                .length(2, 255),
            price: this.validator()
                .required()
                .min(0),
        }
    }
}

const productsMap = () => {
    let mapping = new RepositoryRequestMap('/api/products');
    mapping.map('store', StoreProductRequest);
    return mapping;
}

export default productsMap;