import Document from 'candy-box/structures/document.js';
import RelationAttribute from 'candy-box/repository/relation.js';
import products from 'candy-box-demo/modules/product/repositories/products.js';

class OrderItem extends Document
{
    attributes() {
        return {
            id: Number,
            order_id: Number,
            product_id: Number,
            product: RelationAttribute.oneToOne(products(), 'product_id'),
            qty: Number,
            price: Number,
        };
    }
}

export default OrderItem;