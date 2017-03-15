var express = require('express');
var router  = express.Router();
var pinUp = require('../model/pinupSchema').pinUp;

router.get('/:pinupID',function (req,res) {
  var token = req.headers['x-token'];
  try {
    pinUp.findById(req.params.pinupID,function (err,data1) {
      if(data1!==undefined)
      {
        pinUp.findOneAndUpdate({_id:req.params.pinupID,isDeleted:false},{isDeleted:true},function (err,data) {
          if(data!==null)
          {
            res.send({
              "status":true,
              "message":"Pinup successfully removed",
              "timeStamp":Date.now(),
              "token":token,
              "data":data
            });
          }
          else{
            res.status(401).send({
              "status":false,
              "message":"Pinup already removed.",
              "token":token
            });
          }
        });
      }else{
        res.status(401).send({
          "status": false,
          "message": "Invalid Pinup Identifier (ID), Pinup Identifier doesn't exists"
        });
      }
    });
  } catch (e) {
    if (e == 401) {
        res.status(401).send({
          "status":false,
          "message":"No such pinup data found",
          "token":token
        });
    }
    else {
      res.status(400).send("bad parameter request");
    }
  }

});


module.exports = router;
