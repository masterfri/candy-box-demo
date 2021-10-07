import Document from 'candy-box/structures/document.js';
import RelationAttribute from 'candy-box/repository/relation.js';
import products from 'candy-box-demo/modules/product/repositories/products.js';

class Category extends Document
{
    attributes() {
        return {
            id: Number,
            name: String,
            products: RelationAttribute.oneToMany(products(), 'category_id'),
        };
    }
}

export default Category;