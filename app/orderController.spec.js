const ctrl = require('./orderController');
const orders = require('./../mock-db/orders');


beforeEach(() => {
    jest.clearAllMocks();
});

it('test', () => {
    expect(ctrl.test()).toBe('ok');
});

it('every discount has to have a function', () => {
    ctrl.discounts.forEach(discount => {
        expect(ctrl[discount]).toBeTruthy();
    });
});

it('every discountfunction has to be called', () => {
    let discounts = ctrl.discounts;

    const spy1 = jest.spyOn(ctrl, discounts[0]);
    const spy2 = jest.spyOn(ctrl, discounts[1]);
    const spy3 = jest.spyOn(ctrl, discounts[2]);

    let order = {
        items: [{
            'product-id': 'B102',
            'quantity': '10',
            'unit-price': '4.99',
            'total': '49.90'
        }]
    };

    ctrl.calculateTotalPrice(order);

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();


});

it('should get the total of order 1', () => {
    let order = orders[0];
    console.log(order);

    expect(ctrl.calculateTotalPrice(order)).toBeCloseTo(49.9 - 4.99);
});

it('should get the total of order 2', () => {
    let order = orders[1];
    console.log(order);

    expect(ctrl.calculateTotalPrice(order)).toBeCloseTo(24.95);
});

it('should get the total of order 3', () => {
    let order = orders[2];

    expect(ctrl.calculateTotalPrice(order)).toBeCloseTo(69 - (9.75 * 20 / 100));
});

it('should give 10% discount on total over 1000', () => {
    let order = {
        items: [{
            total: 500
        }, {
            total: 600
        }]
    };

    expect(ctrl.calculateTotalPrice(order)).toBeCloseTo(1100 - 110);
});

it('should get category from orderitem cat 1', () => {
    let item = {
        'product-id': 'A101'
    };
    expect(ctrl.getProductCategory(item)).toBe('1');
});

it('should get category from orderitem cat 2', () => {
    let item = {
        'product-id': 'B102'
    };
    expect(ctrl.getProductCategory(item)).toBe('2');
});

it('should give meaningfull messagen on get category of non existing product', () => {
    let item = {
        'product-id': '???'
    };
    expect(ctrl.getProductCategory(item)).toBe('product not found');
});

it('should offer 5+1 free on category 2', () => {
    let order = {
        items: [{
            'product-id': 'B102',
            'quantity': '10',
            'unit-price': '4.99',
            'total': '49.90'
        }]
    };

    expect(ctrl.calculateTotalPrice(order)).toBeCloseTo(49.90 - 4.99);
});

it('should offer 5+1 free on category 2 (6items)', () => {
    let order = {
        items: [{
            'product-id': 'B102',
            'quantity': '6',
            'unit-price': '1',
            'total': '6'
        }]
    };

    expect(ctrl.calculateTotalPrice(order)).toBeCloseTo(6 - 1);
});

it('should offer 5+1 free on category 2 (5items)', () => {
    let order = {
        items: [{
            'product-id': 'B102',
            'quantity': '5',
            'unit-price': '1',
            'total': '5'
        }]
    };

    expect(ctrl.calculateTotalPrice(order)).toBeCloseTo(5);
});
it('should offer 5+1 free on category 2 (12items)', () => {
    let order = {
        items: [{
            'product-id': 'B102',
            'quantity': '12',
            'unit-price': '1',
            'total': '12'
        }]
    };

    expect(ctrl.calculateTotalPrice(order)).toBeCloseTo(12-2);
});

it('should offer 5+1 free on category 2 (20 items)', () => {
    let order = {
        items: [{
            'product-id': 'B102',
            'quantity': '20',
            'unit-price': '4.99',
            'total': '109.9'
        }]
    };

    expect(ctrl.calculateTotalPrice(order)).toBeCloseTo(109.9 - 4.99 - 4.99 - 4.99);
});

it('should return cheapest product', () => {
    let items = [{
        'id': 'B102',
        'quantity': '20',
        'unit-price': '4.99',
        'total': '49.90'
    }, {
        'id': 'A101',
        'quantity': '12',
        'unit-price': '3.10',
        'total': '60'
    }, {
        'id': 'A103',
        'quantity': '12',
        'unit-price': '3',
        'total': '60'
    }, {
        'id': 'A104',
        'quantity': '12',
        'unit-price': '13',
        'total': '60'
    }];
    expect(ctrl.getCheapestItem(items).id).toBe('A103');
});

it('should return cheapest item from one item', () => {
    let items = [{
        'id': 'B102',
        'quantity': '20',
        'unit-price': '4.99',
        'total': '49.90'
    }];
    expect(ctrl.getCheapestItem(items).id).toBe('B102');
});

it('should give 20% on cheapest product if more than one is bought from cat 1 (multiple of same product)', () => {
    let order = {
        items: [{
            'product-id': 'A101',
            'quantity': '12',
            'unit-price': '5',
            'total': '60'
        }]
    };
    expect(ctrl.calculateTotalPrice(order)).toBeCloseTo(60 - (5 * 20 / 100));
});

it('should give 20% on cheapest product if more than one is bought from cat 1 (2different products)', () => {
    let order = {
        items: [{
            'product-id': 'A101',
            'quantity': '1',
            'unit-price': '5',
            'total': '5'
        }, {
            'product-id': 'A102',
            'quantity': '1',
            'unit-price': '6',
            'total': '6'
        }]
    };
    expect(ctrl.calculateTotalPrice(order)).toBeCloseTo(11 - (5 * 20 / 100));
});


it('should not give 20% on cheapest product if more only one is bought from cat 1', () => {
    let order = {
        items: [{
            'product-id': 'A101',
            'quantity': '1',
            'unit-price': '5',
            'total': '5'
        }, {
            'product-id': 'A102',
            'quantity': '0',
            'unit-price': '6',
            'total': '0'
        }]
    };
    expect(ctrl.calculateTotalPrice(order)).toBeCloseTo(5);
});

it('should give 20% on cheapest product if more than one is bought from cat 1 (only 1 product)', () => {
    let order = {
        items: [{
            'product-id': 'A101',
            'quantity': '1',
            'unit-price': '5',
            'total': '5'
        }, {
            'product-id': 'B102',
            'quantity': '1',
            'unit-price': '5',
            'total': '5'
        }]
    };
    expect(ctrl.calculateTotalPrice(order)).toBeCloseTo(10);
});

it('check if order should check if object is an order', () => {
    let order = {
        'id': '1',
        'customer-id': '1',
        'items': [{
            'product-id': 'B102',
            'quantity': '10',
            'unit-price': '4.99',
            'total': '49.90'
        }],
        'total': '49.90'
    };

    ctrl.checkIfObjectIsOrder(order);
    expect(ctrl.checkIfObjectIsOrder(order)).toBe(true);
});

it('order without items is no order', () => {
    let order = {
        'id': '1',
        'customer-id': '1',
        'fakeitems': [{
            'product-id': 'B102',
            'quantity': '10',
            'unit-price': '4.99',
            'total': '49.90'
        }],
        'total': '49.90'
    };

    ctrl.checkIfObjectIsOrder(order);
    expect(ctrl.checkIfObjectIsOrder(order)).toBe(false);
});


it('item without product-id is no order', () => {
    let order = {
        'id': '1',
        'customer-id': '1',
        'items': [{
            'fakeproduct-id': 'B102',
            'quantity': '10',
            'unit-price': '4.99',
            'total': '49.90'
        }],
        'total': '49.90'
    };

    ctrl.checkIfObjectIsOrder(order);
    expect(ctrl.checkIfObjectIsOrder(order)).toBe(false);
});

it('item without quantity is no order', () => {
    let order = {
        'id': '1',
        'customer-id': '1',
        'items': [{
            'product-id': 'B102',
            'fakequantity': '10',
            'unit-price': '4.99',
            'total': '49.90'
        }],
        'total': '49.90'
    };

    ctrl.checkIfObjectIsOrder(order);
    expect(ctrl.checkIfObjectIsOrder(order)).toBe(false);
});

it('item without unit-price is no order', () => {
    let order = {
        'id': '1',
        'customer-id': '1',
        'items': [{
            'product-id': 'B102',
            'quantity': '10',
            'fakeunit-price': '4.99',
            'total': '49.90'
        }],
        'total': '49.90'
    };

    ctrl.checkIfObjectIsOrder(order);
    expect(ctrl.checkIfObjectIsOrder(order)).toBe(false);
});

it('item without total is no order', () => {
    let order = {
        'id': '1',
        'customer-id': '1',
        'items': [{
            'product-id': 'B102',
            'quantity': '10',
            'unit-price': '4.99',
            'faketotal': '49.90'
        }],
        'total': '49.90'
    };

    ctrl.checkIfObjectIsOrder(order);
    expect(ctrl.checkIfObjectIsOrder(order)).toBe(false);
});