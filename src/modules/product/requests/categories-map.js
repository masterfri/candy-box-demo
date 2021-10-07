import RepositoryRequestMap from 'candy-box/repository/request-map.js';
import Request, {
    Method } from 'candy-box/transport/request.js';

class StoreCategoryRequest extends Request
{
    method() {
        return Method.PUT;
    }

    route() {
        return '/api/categories';
    }

    validation() {
        return {
            name: this.validator()
                .required()
                .length(2, 255),
        }
    }
}

const categoriesMap = () => {
    let mapping = new RepositoryRequestMap('/api/categories');
    mapping.map('store', StoreCategoryRequest);
    mapping.map('menu', {
        route: '/api/menu',
        method: Method.GET,
    });
    return mapping;
}

export default categoriesMap;