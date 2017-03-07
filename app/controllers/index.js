var express = require('express');
var app = express();
var router = express.Router();


router.use('/admin',require('./admin'));
router.use('/pinup',require('./pinup'));
router.get('/', function(req, res) {
    res.send('This is main controller');
});


module.exports = router;
