import RepositoryRequestMap from 'candy-box/repository/request-map.js';

const orderItemsMap = () => new RepositoryRequestMap('/api/order-items');

export default orderItemsMap;