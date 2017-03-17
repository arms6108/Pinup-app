var express = require('express');
var router = express.Router();
var topicSchema = require('../model/topicSchema');
var common = require('../common/common');
var com = new common();

router.post('/', function(req, res) {
    var token = req.headers['x-token'];
    try {
          //  console.log(req.body);

        var data1 = {
            topic: req.body.topic,
        };
        console.log("input data",data1.topic);
        if(data1.topic===""||data1.topic===undefined)
        {
          throw 400;
        }
        topicSchema.findOne(data1,function (err,data) {
          // if(data.topic===data1.topic)
          console.log("inside::",data);
          var valid = (data!==null?(data.topic!==data1.topic):true);
          if(valid )
          {
            var addTopic = com.topicSave(data1, function(err, dataLocal) {
               console.log("data",dataLocal);
                res.json({
                    "status": true,
                    "topicData":dataLocal,
                    "message": "Topic added successfully",
                    "token": token
                });
            });

        }else {
          console.log("entered");
          res.status(409).send({
              "status": "false",
              "message": [
                  "Topic addition failure",
                  "Topic already exists for the sub domain"
              ],
              "token": token
          });
        }
        });



    } catch (e) {
      console.log(e);
      if(e==401){
        res.status(401).send({
            "status": "false",
            "message": [
                "Topic addition failure",
                "Topic already exists for the sub domain"
            ],
            "token": token
        });
      }
      else {
        res.status(400).send({
          "status":false,
          "message":"No topic is been sent",
          "token":token
        });
      }
    }
});

module.exports = router;
