import Document from 'candy-box/structures/document.js';
import RelationAttribute from 'candy-box/repository/relation.js';
import orderItems from 'candy-box-demo/modules/product/modules/order/repositories/order-items.js';

class Order extends Document
{
    attributes() {
        return {
            id: Number,
            date: Date,
            type: String,
            user_id: Number,
            status: String,
            items: RelationAttribute.oneToMany(orderItems(), 'order_id').with('product'),
        };
    }

    init() {
        let moment = getOrderMoment();
        this.date = moment.date;
        this.type = moment.type;
        this.status = 'draft';
        this.items = [];
        return this;
    }
}

const getOrderMoment = () => {
    let datetime = new Date();
    let date = datetime.toISOString().substr(0, 10);
    let type = 'dinner';
    if (datetime.getHours() < 10) {
        type = 'breakfast';
    } else if (datetime.getHours() < 14) {
        type = 'lunch';
    }
    return {date, type};
}

const OrderStatus = {
    DRAFT: 'draft', 
    NEW: 'new', 
    PROCESSED: 'processed',
    FAILED: 'failed',
};

export default Order;

export {
    getOrderMoment,
    OrderStatus,
}