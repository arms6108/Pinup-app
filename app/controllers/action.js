var express = require('express');
var app = express();
var router = express.Router();
var com = require('../common/common');
var pinUp = require('../model/pinupSchema').pinUp;
var visitor = require('../model/detail');
var cookie = require('cookie');



router.post('/action', function(req, res) {
    try {

      var condition={};
        pinupID = req.body.pinupID;
        console.log("pinid",pinupID);
        if (req.body.like === true) {
        condition.$inc={like:1};
      }else{
        condition.$inc={unlike:1};
      }
            pinUp.findByIdAndUpdate(pinupID, condition, function(err, data) {
              console.log(err,data);
              res.send("success");
            });

      } catch (e) {
          console.log(e);
        if (e == 401) {
            res.status(401).send({
                "status": false,
                "message": "Pinup Identier doesnt exist"
            });
        }
    }

});

module.exports = router;
