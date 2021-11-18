import RepositoryProxy from 'candy-box/repository/proxy.js';
import { pickProps,
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
        let data = pickProps(request.body, [
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
        return pickProps(document.export(), [
            'id', 'login', 'name', 'role', 'balance',
        ]);
    }
}

export default UserRepositoryProxy;