//@ts-check
const WebhookNotification = require('./models/webhookNotification');


module.exports = function (app) {
    app.get('/ping', (req, res) => {
        res.status(200).json({
            'message': 'alive'
        });
    });

    app.post('/contact', (req, res) => {
        console.log(req.body);

        let whn = new WebhookNotification();
        whn.account_id = req.body.account_id;
        whn.event_type = req.body.event_type;
        whn.object_type = req.body.object_type;
        whn.object_id = req.body.object_id;

        whn.save().then(() => {
            res.status(200).json(req.body);
        });
    });

    app.get('/notifications', (req, res) => {
        WebhookNotification.find().exec().then(notifications => {
            res.status(200).json(notifications);
        });
    });

    app.get('*/*', (req, res) => {
        res.status(200).json({
            'message': 'ok'
        });
    });

};