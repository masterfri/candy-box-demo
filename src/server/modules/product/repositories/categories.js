import SqlRepository from 'candy-box/repository/sql.js';
import Category from 'candy-box-demo/modules/product/documents/category.js';
import { Relation } from 'candy-box/repository/relation.js';

class CategoryRepository extends SqlRepository
{
    /**
     * Get full menu
     * 
     * @returns {Promise}
     */
    menu() {
        return this.search({}).then((results) => {
            return Relation.resolve(results, (relations) => {
                relations.query('products')
                    .where('parent_id', '=', null)
                    .where('available', '=', 1)
                    .with((relations) => {
                        relations.query('addons')
                            .where('available', '=', 1);
                    });
            }).then(() => results);
        });
    }
}

const categories = () => new CategoryRepository(Category, 'product_categories');

export default categories;