var express = require('express');
var router = express.Router();
var pinUp = require('../model/pinupSchema').pinUp;
var common = require('../common/common');
var com = new common();

router.post('/', function(req, res) {
  var data = {};
  var timeStamp = Date.now();
  var token = req.headers['x-token'];
  try {
      pinupUrl = req.body.pinupUrl;
      var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
      var regex = new RegExp(expression);
      if(!pinupUrl.match(regex)){
        throw new Error("Please provide a valid url, URL ("+pinupUrl+") is invalid.");
        return;
      }else{
        var promiseURL = com.scrapePackage(pinupUrl).then(function(objData) {
            var tempObj = objData;
            data = {
                pinupUrl: tempObj.pinupUrl,
                link: tempObj.link,
                title: tempObj.title,
                imageUrl: tempObj.imageUrl,
                tags: tempObj.tags,
                description: tempObj.description,
            };
            var pinScrapeData = com.save(data, function(err, dataLocal) {
              if(err){
                if(typeof err === "object"){
                  var field = err.message.split('.$')[0];
                  field = field.split(' dup key')[0];
                  field = field.substring(0, field.lastIndexOf('_')); // returns email
                  res.status(401).send({
                      "status": false,
                      "message":"Pinup url already exists",
                      "token": token
                  });
                }
              }else{
                res.json({
                    "status": "true",
                    "message": 'Pinup added successfully',
                    "pinupData": [{
                        "link": data.pinupUrl,
                        "title": data.title
                    }],
                    "token": token
                });
                return;
              }
            });
        });
      }
  } catch (e) {
    var errorMessage = "Pinup addition failure";
    if(e instanceof ReferenceError){
      errorMessage = "Something bad happened, Please contact systme administrator";
    }else{
      if(typeof e === 'object'){
        errorMessage = e.message;
      }
    }
    res.status(401).send({
        "status": "false",
        "message": errorMessage,
        "token": token
    });
  }
});
module.exports = router;
