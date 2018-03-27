module.exports = function (app) {
    app.get('/ping', (res, req) => {
        req.status(200).json({
            'message': 'alive'
        });
    });


    
};