var express = require('express');
var router  = express.Router();
var topicSchema = require('../model/topicSchema');

  router.get('/:topicId', function(req, res) {
      var token = "takfaljfldasjf;ljasf;l";

      try {
          topicSchema.findById(req.params.topicId, function(err,data) {
              res.send({
                "status":"true",
                "message":"Topic Details successfully",
                "timeStamp":Date.now(),
                "Topic Data":[
                  {
                    "id":data._id,
                    "topic":data.topic
                  }
                ],
                "token":token
              });
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
