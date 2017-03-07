var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./app/model/db');
var morgan = require('morgan');

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(require('./app/controllers'));


var port = 3030;
app.listen(port, function() {
    db.connect();
    console.log('listening on port 3030');
});
