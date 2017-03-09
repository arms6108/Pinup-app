var express = require('express');
var router = express.Router();
var pinUp = require('../model/pinupSchema').pinUp;

router.get('/', function(req, res) {
    var token = "takfaljfldasjf;ljasf;l";
    try {
        pinUp.find({"isDeleted":false}, function(err,data) {
          var dataSend={
            "status":true,
            "message":"Fetched the recent pinups Successfully",
            "timeStamp":Date.now(),
            "pinupData":data,
            "token":token
          };
            res.send(dataSend);
        });
    } catch (e) {
        if (e == 401) {
            res.status(401).send("unauthorized user");
        }
        else {
          res.status(400).send("bad parameter request");
        }
    }
});


module.exports = router;
