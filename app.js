var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var db = require('./app/model/db');
var morgan = require('morgan');
var fs = require('fs');

app.use(morgan('dev'));
app.use(morgan('common',{
  stream:fs.createWriteStream('./access.log',{flag:'a'})
}));
app.use(cors());
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
