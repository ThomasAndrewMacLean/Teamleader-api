const products = require('./../mock-db/products');

const orderController = {

    discounts: ['giveDiscountOnOver1000', 'giveDiscountCategory2', 'giveDiscountCategory1'],

    calculateTotalPrice(order) {
        let total = order.items.reduce((a, b) => a += parseFloat(b.total, 10), 0);
        this.discounts.forEach(d => total = (this[d](total, order.items)));
        return Math.round(total * 100) / 100;
    },
    giveDiscountOnOver1000(total) {
        return total > 1000 ? total = total * 90 / 100 : total;
    },
    giveDiscountCategory2(total, items) {
        items.filter(i => this.getProductCategory(i) === '2' && i.quantity > 6).forEach(f => total -= (f['unit-price'] * Math.floor(f.quantity / 6)));
        return total;
    },
    giveDiscountCategory1(total, items) {
        let itemsCategory1 = items.filter(i => this.getProductCategory(i) === '1' && i.quantity !== '0');
        if (itemsCategory1.length && (itemsCategory1.length > 1 || itemsCategory1[0].quantity > 1)) {
            total -= (this.getCheapestItem(itemsCategory1)['unit-price'] * 20 / 100);
        }
        return total;
    },
    getProductCategory(item) {
        const product = products.find(product => product.id === item['product-id']);
        return (product && product.category || 'product not found');
    },
    getCheapestItem(items) {
        let sort = items.sort((a, b) => parseFloat(a['unit-price'], 10) > parseFloat(b['unit-price'], 10));
        return sort[0];
    },
    test() {
        return 'ok';
    },
    checkIfObjectIsOrder(order) {

        let keys = Object.keys(order);
        let hasItems = keys.includes('items');
        let itemKeysCorrect = true;
        if (hasItems) {
            order.items.forEach(item => {
                let itemKeys = Object.keys(item);
                if (!itemKeys.includes('product-id') || !itemKeys.includes('quantity') ||
                    !itemKeys.includes('unit-price') || !itemKeys.includes('total')) {
                    itemKeysCorrect = false;
                }
            });
        }

        return hasItems && itemKeysCorrect;
    }
};

module.exports = orderController;