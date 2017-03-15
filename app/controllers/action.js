var express = require('express');
var app = express();
var router = express.Router();
var com = require('../common/common');
var pinUp = require('../model/pinupSchema').pinUp;

app.use(express.cookieParser('my secret here'));
app.use(express.bodyParser());

router.post('/', function(req, res) {
    try {
      // if (req.cookies.remember)
      //   res.send({
      //     "message": "Appropriate action already been taken"
      //   });
      var condition;
        pinupID = req.body.pinupID;
        if (req.body.like === true) {
        condition=like;
      }else{
        condition=unlike;
      }
            pinUp.findByIDAndUpdate(pinupID, {$inc: {condition: 1}}, function(err, data) {
              console.log(data);
            });
        } catch (e) {
        if (e == 401) {
            res.status(401).send({
                "status": false,
                "message": "Pinup Identier doesnt exist"
            });
        }
    }

});

module.exports = router;
