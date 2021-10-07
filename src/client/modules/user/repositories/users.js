import RestRepository from 'candy-box/repository/rest.js';
import User from 'candy-box-demo/modules/user/documents/user.js';
import usersMap from 'candy-box-demo/modules/user/requests/users-map.js';

const users = () => new RestRepository(User, usersMap());

export default users;