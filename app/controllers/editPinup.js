var express = require('express');
var router  = express.Router();
var pinUp = require('../model/pinupSchema').pinUp;

router.get('/:pinupID',function (req,res) {
    var token="adsfjadfhpaohdfahdfpahsdf";
  try {
    console.log(req.params.pinupID);
    pinUp.findById(req.params.pinupID,function (err,data) {
      console.log(data);
      if(data!==undefined)
      {
        var dataDetails={
          "status":true,
          "message":[
            "Pinup data fetched Successfully"
          ],
          "timeStamp": Date.now(),
          "pinupData":[data],
          "token":token
        };
        res.send(dataDetails);
      }
      else {

        res.status(401).send({
          "status":false,
          "message":[
                   "Failed to fetch the Pinup data",
                   "Pinup Identifier (ID) not set, Pinup Indentifier cannot be blank",
                   "Invalid Pinup Identifier (ID), Pinup Identifier doesn't exists"
        ],
          "timeStamp":Date.now(),
          "token":token
        });
      }
    });
  } catch (e) {
    console.log(e);
    if (e == 401) {
        res.status(401).send({
          "status":false,
          "message":[
                      "Failed to fetch the Pinup data",
                      "Pinup Identifier (ID) not set, Pinup Indentifier cannot be blank",
                      "Invalid Pinup Identifier (ID), Pinup Identifier doesn't exists"
          ],
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
