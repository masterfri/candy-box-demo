import Document from 'candy-box/structures/document.js';

class User extends Document
{
    attributes() {
        return {
            id: Number,
            login: String,
            password: String,
            name: String,
            role: String,
            balance: Number,
        };
    }

    can(action) {
        switch (action) {
            case 'users.read':
                return ['admin', 'manager'].indexOf(this.role) !== -1;
            case 'users.write':
                return ['admin'].indexOf(this.role) !== -1;
            case 'products.read':
            case 'products.write':
            case 'categories.read':
            case 'categories.write':
                return ['admin', 'manager'].indexOf(this.role) !== -1;
            case 'orders.read':
            case 'orders.write':
            case 'orders.process':
                return ['admin', 'manager', 'delivery'].indexOf(this.role) !== -1;
            case 'orders.checkout':
            case 'orders.put':
            case 'orders.cart':
                return true;
            default:
                return false;
        }
    }
}

export default User;