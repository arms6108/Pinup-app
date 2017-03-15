var express = require('express');
var router = express.Router();
var pinUp = require('../model/pinupSchema').pinUp;

router.post('/', function(req, res) {
    var token = req.headers['x-token'];
    console.log(req.body);
    try {
        // pinUp.findByIdAndUpdate(req.body.pinupID, { $set:{topicID:req.body.topicID}},{new:true}, function(err, data) {
        //   console.log(err, data);
        //     res.send({
        //         "status": true,
        //         "message": "Pinup linked to topic successfully",
        //         "token": token
        //     });
        // });
        pinUp.findById(req.body.pinupID).populate({path:"topic"}).exec(function (err,data) {
              data.topicID=req.body.topicID;
              console.log("New::",data.toObject());
              data.save(function (newErr,newData) {
                console.log(newErr,newData);
              });
                res.send({
                    "status": true,
                    "message": "Pinup linked to topic successfully",
                    "token": token
                });
        });
    } catch (e) {
      if (e == 401) {
          res.status(401).send({
            "status":"false",
            "message":"invalid pinupID or TopicId provided.",
            "token":token
          });
      }
      else {
        res.status(400).send("bad parameter request");
      }
    }
});

module.exports = router;
