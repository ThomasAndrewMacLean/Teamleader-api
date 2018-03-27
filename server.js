const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./app/routes').default;

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

routes(app);

let port = process.env.PORT || 8080;
app.listen(port, () => console.log(`app listening on port ${port}`));