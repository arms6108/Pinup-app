var express = require('express');
var router  = express.Router();
var topicSchema = require('../model/topicSchema');

router.post('/',function (req,res) {
  var topicID = req.body.topicID;
  var token = req.headers['x-token'];
  try {
    topicSchema.findById(topicID,function (err,data1) {
      // console.log(data1);
      console.log("topicID",data1);
      if(data1!==undefined)
      {
        topicSchema.findOneAndUpdate({_id:topicID,isDeleted:false},{isDeleted:true},function (err,data) {
          console.log("DATA",data);
          if(data!==null)
          {
            res.send({
              "status":true,
              "message":"Topic successfully removed",
              "token":token,
              "data":data
            });
          }
          else{
            res.status(401).send({
              "status":false,
              "message":[
                "Failed to remove the topic",
                "Topic Identifier (ID) not set, Topic Indentifier cannot be blank",
                "Invalid Topic Identifier (ID), Topic Identifier doesn't exists"
              ],
              "token":token
            });
          }
        });
      }else{
        res.status(401).send({
          "status": false,
          "message": "Invalid Topic Identifier (ID), Topic Identifier doesn't exists"
        });
      }
    });
  }
  catch (e) {
    if(e==401){
      res.status(401).send({
        "status": false,
        "message": [
            "Failed to remove the topic",
            "Topic Identifier (ID) not set, Topic Indentifier cannot be blank",
            "Invalid Topic Identifier (ID), Topic Identifier doesn't exists"
          ],
        "token":token
      });
    }
      else{
        res.status(400).send("Bad Parameter request");
      }
    }

  });

module.exports = router;
