var express = require('express');
var router  = express.Router();
var pinUp = require('../model/pinupSchema').pinUp;
var topicSchema = require('../model/topicSchema');
  router.get('/:topicID', function(req, res) {
      var token = req.headers['x-token'];

      try {
          topicSchema.findById(req.params.topicID,'topicID topic', function(err,data) {
            if (data!==undefined) {
              data=data.toObject();
              res.send({
                "status":"true",
                "message":"Topic Details successfully",
                "Topic Data":data,
                "token":token
              });
            }else {
              res.status(404).send({
                "status":false,
                "message":"Topic Identifier is invalid",
                "token":token
              });            }

          });
      } catch (e) {
          if (e == 401) {
              res.status(401).send({
                "status":"false",
                "token":token
              });
          }
          else if(e == 404){
              //handling of 404 error
          }
          else {
            res.status(400).send("bad parameter request");
          }
      }
  });


module.exports = router;
