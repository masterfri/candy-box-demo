import RepositoryRequestMap from 'candy-box/repository/request-map.js';
import Request, {
    Method } from 'candy-box/transport/request.js';

class StoreUserRequest extends Request
{
    method() {
        return Method.PUT;
    }

    route() {
        return '/api/users';
    }

    validation() {
        return {
            login: this.validator()
                .required()
                .length(5, 50)
                .format(/^[a-zA-Z0-9_-]+$/),
            password: this.validator()
                .when(() => this.get('id') === null, (chain) => {
                    chain.required();
                })
                .length(8, 50),
            name: this.validator()
                .required()
                .length(2, 255),
            role: this.validator()
                .required()
                .in([
                    'customer', 
                    'delivery', 
                    'manager', 
                    'admin',
                ]),
        }
    }
}

const usersMap = () => {
    let mapping = new RepositoryRequestMap('/api/users');
    mapping.map('store', StoreUserRequest);
    return mapping;
}

export default usersMap;