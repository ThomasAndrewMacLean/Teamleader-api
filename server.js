const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./app/routes');

const app = express();

mongoose.connect('mongodb://dbreadwrite:' + process.env.MONGO_DB_PW + '@cluster0-shard-00-00-zoxrl.mongodb.net:27017,cluster0-shard-00-01-zoxrl.mongodb.net:27017,cluster0-shard-00-02-zoxrl.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

routes(app);

let port = process.env.PORT || 8080;
app.listen(port, () => console.log(`app listening on port ${port}`));