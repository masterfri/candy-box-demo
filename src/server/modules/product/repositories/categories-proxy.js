import RepositoryProxy from 'candy-box/repository/proxy.js';

class CategoryRepositoryProxy extends RepositoryProxy
{
    constructor(repository) {
        super(repository);
        this.protectRead('categories.read');
        this.protectWrite('categories.write');
    }

    /**
     * Forwarding to "menu" method of repository
     * 
     * @param {Request} request 
     * @returns {Promise}
     */
    menu(request) {
        return this._proxyMethod(
            request,
            'menu', 
            [], 
            (results) => this._serializeMenu(results)
        );
    }

    /**
     * Serialize menu
     * 
     * @param {Collection} collection 
     * @returns {Array}
     */
    _serializeMenu(collection) {
        return collection.all().map((category) => ({
            id: category.id,
            name: category.name,
            products: category.products.value.all().map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
                addons: product.addons.value.all().map((addon) => ({
                    id: addon.id,
                    name: addon.name,
                    price: addon.price,
                })),
            })),
        }));
    }
}

export default CategoryRepositoryProxy;