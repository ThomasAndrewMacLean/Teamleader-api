//@ts-check
const WebhookNotification = require('./models/webhookNotification');
const orders = require('./../mock-db/orders');
const products = require('./../mock-db/products');


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

    app.get('*/*', (req, res) => {
        res.status(200).json({
            'message': 'ok'
        });
    });

};