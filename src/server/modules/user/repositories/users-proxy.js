import RepositoryProxy from 'candy-box/repository/proxy.js';
import { onlyProps,
    isNil } from 'candy-box/helpers.js';
import { hashPassword } from 'candy-box/auth/identity.js';

class UserRepositoryProxy extends RepositoryProxy
{
    constructor(repository) {
        super(repository);
        this.protectRead('users.read');
        this.protectWrite('users.write');
    }

    _getDocumentFromRequest(request) {
        let data = onlyProps(request.body, [
            'id', 'login', 'name', 'role',
        ]);
        let user = this._repository.newDocument(data);
        let password = request.get('password');
        if (!isNil(password) && password.length !== 0) {
            user.password = hashPassword(password);
        }
        return user;
    }

    _serializeDocument(document) {
        return onlyProps(document.export(), [
            'id', 'login', 'name', 'role', 'balance',
        ]);
    }
}

export default UserRepositoryProxy;