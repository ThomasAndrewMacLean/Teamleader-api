//@ts-check



module.exports = function (app) {
    app.get('/ping', (req, res) => {
        res.status(200).json({
            'message': 'alive'
        });
    });

    app.post('/contact', (req, res) => {
        console.log(req.body);

        res.status(200).json(req.body);
    });

    app.get('*/*', (req, res) => {
        res.status(200).json({
            'message': 'ok'
        });
    });

};