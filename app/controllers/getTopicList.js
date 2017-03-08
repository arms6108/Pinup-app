var express = require('express');
var router  = express.Router();
var pinUp = require('../model/pinupSchema').pinUp;
var topicSchema = require('../model/topicSchema');

router.get('/',function (req,res) {

  var token = "takfaljfldasjf;ljasf;l";

  try {
      topicSchema.find({}, function(err,data) {
        var dataSend = {
          "success": true,
          "message": "Fetched the list of topics Successfully",
          "topicData": data,
          "timeStamp":Date.now(),
          "token":token
        };
        res.send(dataSend);
      });
  } catch (e) {
      if (e == 401) {
          res.status(401).send({
            "status":"false",
            "timeStamp":Date.now(),
            "token":token
          });
      }
      else {
        res.status(400).send("bad parameter request");
      }
  }

});

module.exports = router;
