import Document, {
    Attribute } from 'candy-box/structures/document.js';
import RelationAttribute from 'candy-box/repository/relation.js';
import products from 'candy-box-demo/modules/product/repositories/products.js';
import categories from 'candy-box-demo/modules/product/repositories/categories.js';

class Product extends Document
{
    attributes() {
        return {
            id: Number,
            name: String,
            category_id: Number,
            category: RelationAttribute.oneToOne(categories(), 'category_id'),
            parent_id: Number,
            parent: RelationAttribute.oneToOne(products(), 'parent_id'),
            addons: RelationAttribute.oneToMany(products(), 'parent_id'),
            price: Number,
            available: Attribute.boolean(true),
        };
    }
}

export default Product;