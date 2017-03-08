var express = require('express');
var router  = express.Router();
var pinUp = require('../model/pinupSchema').pinUp;
var common = require('../common/common');
var com = new common();

router.post('/',function (req,res) {
  console.log("body:",req.body);
  var timeStamp = Date.now();
  var token = "adfhkashdflahflnaslfnkafaehahbcvbasdifa";
  try {
  // pinUp.create(req.body,function (req,user) {
    pinupUrl = req.body.pinupUrl;
    var data ={};
    com.scrapePackage(pinupUrl).then(function (objData) {
      var tempObj = objData;
     data = {
       pinupUrl:tempObj.pinupUrl,
        link:tempObj.link,
        title:tempObj.title,
        imageUrl:tempObj.imageUrl,
        tags:tempObj.tags,
        description:tempObj.description,
      };
      var pinScrapeData = com.save(data,function (err,dataLocal) {
        console.log(dataLocal);
      });
      res.json({
        "status": "true",
        "message": 'Pinup added successfully',
        "timeStamp":Date.now(),
        "pinupData": [
    {
      "link": data.link,
      "title": data.title
    }
  ],
        "token": token
      });
    });

console.log("data",data);

    } catch (e) {
      console.log(e);
      res.status(401).send({
  "status": "false",
  "message": [
    "Pinup addition failure",
    "Pinup url already exists"
  ],
  "timeStamp": Date.now(),
  "pinupData": [
    {
      "link": "link"
    }
  ],
  "token": token
});

    }
  // });
});
module.exports = router;
