var express = require('express');
var router  = express.Router();
var pinUp = require('../model/pinupSchema').pinUp;

router.post('/',function (req,res) {

    var token = req.headers['x-token'];
  try {
    var pinupID=req.body.pinupID;
    pinUp.findByIdAndUpdate(pinupID,{title:req.body.title,imageUrl:req.body.imageUrl,description:req.body.description,tags:req.body.tags},function (err,data) {
      // console.log("data",data);
      var dataResponse={
        "status":true,
        "message":"Pinup edited successfully",
        "pinupData":[
          {
            "link":data.pinupUrl,
            "title":data.title
          }
        ],
        "token":token
      };
      res.send(dataResponse);
    });
  } catch (e) {
    if (e == 401) {
        res.status(401).send({
          "status":false,
          "message":[
            "Pinup editing failure",
            "Pinup Identifier (ID) not set, Pinup Indentifier cannot be blank",
            "Invalid Pinup Identifier (ID), Pinup Identifier doesn't exists",
            "Title not set, Title cannot be blank",
            "Image url not valid, provide a valid url link to scrape"
          ],
          "token":token
        });
    }
    else {
      res.status(400).send("bad parameter request");
    }
  }

});

module.exports = router;
