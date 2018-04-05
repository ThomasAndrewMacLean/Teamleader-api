//@ts-check
const WebhookNotification = require('./models/webhookNotification');
const orders = require('./../mock-db/orders');
const products = require('./../mock-db/products');
const customers = require('./../mock-db/customers');
const orderController = require('./orderController');

module.exports = function (app) {
    app.get('/ping', (req, res) => {
        res.status(200).json({
            'message': 'alive'
        });
    });

    app.post('/contact', (req, res) => {
        console.log(req.body);
        let whn = new WebhookNotification(req.body);

        whn.save().then(saved => {
            res.status(200).json(saved);
        });
    });

    app.get('/notifications', (req, res) => {
        WebhookNotification.find().exec().then(notifications => {
            res.status(200).json(notifications);
        });
    });

    app.get('/getOrders', (req, res) => {
        res.status(200).json(orders);
    });

    app.get('/getProducts', (req, res) => {
        res.status(200).json(products);
    });

    app.get('/getCustomers', (req, res) => {
        res.status(200).json(customers);
    });

    app.post('/calculateDiscount', (req, res) => {
        let order = req.body.order;

        if (order && orderController.checkIfObjectIsOrder(order)) {
            let newPrice = orderController.calculateTotalPrice(order);
            order.discount = (Math.round((newPrice - parseFloat(order.total)) * 100) / 100).toString();
            order.priceWithDiscount = newPrice.toString();

            res.status(200).json({
                order: order
            });
        } else {
            res.status(500).json({
                message: 'no valid order found'
            });
        }
    });

    app.get('*/*', (req, res) => {
        res.status(200).json({
            'message': 'ok'
        });
    });

};