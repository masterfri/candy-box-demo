import SqlRepository from 'candy-box/repository/sql.js';
import User from 'candy-box-demo/modules/user/documents/user.js';

const users = () => new SqlRepository(User, 'users');

export default users;