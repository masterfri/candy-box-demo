import RestRepository from 'candy-box/repository/rest.js';
import Category from 'candy-box-demo/modules/product/documents/category.js';
import categoriesMap from 'candy-box-demo/modules/product/requests/categories-map.js';

class CategoryRepository extends RestRepository
{
    /**
     * Get full menu
     * 
     * @returns {Promise}
     */
    menu() {
        return this._request('menu').then((results) => {
            return this._makeCollection(results);
        });
    }
}

const categories = () => new CategoryRepository(Category, categoriesMap());

export default categories;