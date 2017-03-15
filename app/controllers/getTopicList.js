var express = require('express');
var router  = express.Router();
var pinUp = require('../model/pinupSchema').pinUp;
var topicSchema = require('../model/topicSchema');

router.get('/',function (req,res) {

  var token = req.headers['x-token'];

  try {
      topicSchema.find({},'topicID topic',function(err,data) {
        data = data.map(function (p) {
         return p.toObject();
       });
        var dataSend = {
          "success": true,
          "message": "Fetched the list of topics Successfully",
          "topicData": data,
          "token":token
        };
        res.send(dataSend);
      });
  } catch (e) {
      if (e == 401) {
          res.status(401).send({
            "status":"false",
            "token":token
          });
      }
      else {
        res.status(400).send("bad parameter request");
      }
  }

});

module.exports = router;
