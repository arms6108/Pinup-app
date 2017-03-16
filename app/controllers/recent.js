var express = require('express');
var router = express.Router();
var pinUp = require('../model/pinupSchema').pinUp;

router.get('/recent', function(req, res) {
  //  var token = req.headers['x-token'];
    var token="adfbnkafkashfalhsl";
    try {
          //var page = 0;
          pinUp.find({"isDeleted":false},'pinupID pinupUrl title imageUrl tags description createdAt views like unlike',{limit:5},function(err,data) {
           data = data.map(function (p) {
           return p.toObject();
          });
          var dataSend={
            "status":true,
            "message":"Fetched the recent pinups Successfully",
            "pinupData":data,
            "token":token
          };
          //console.log(data);
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
