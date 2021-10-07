import App from 'candy-box/app.js';

const UserRepositorySymbol = Symbol('UserRepository');
const users = () => App.make(UserRepositorySymbol);

export default users;

export {
    UserRepositorySymbol,
}