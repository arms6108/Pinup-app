var express = require('express');
var app = express();
var router = express.Router();
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

var pinUp = require('../model/pinupSchema');
var SECRET = 'shhhhhhared-secret';
app.use('/api', expressJwt({secret: SECRET}));
/////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/addPinup',function(req,res){
  console.log(req.body);
   pinUp.create(req.body,function(err,user){
     var token = jwt.sign(user, SECRET, { expiresIn: 18000 });
     pinupUrl=req.body.pinupUrl;
     timeStamp=Math.floor(new Date() / 1000);
     xtoken=token;

    if(err){
        res.send({

            "status": "false",
            "message": [
              "Pinup addition failure",
              "Pinup url already exists"
            ],
            "timeStamp": timeStamp,
            "pinupData": [
              {
                "link": link
              }
            ],
            "token": xtoken

});
    }else{

      res.json({
        "success": "true",
        "message": 'Pinup added successfully',
        "timeStamp":timeStamp,
        "pinupData": [
    {
      "link": link,
      "title": title
    }
  ],
        "token": xtoken
      });
    }
});
});
/////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/editPinup',function(req,res){
  console.log(req.body);
   pinUp.create(req.body,function(err,user){
     var token = jwt.sign(user, SECRET, { expiresIn: 18000 });

    if(err){
        res.send({

            "status": "false",
            "message": [
              "Failure in fetching the Pinup data",
    "Pinup Identifier (ID) not set, Pinup Indentifier cannot be blank",
    "Invalid Pinup Identifier (ID), Pinup Identifier doesn't exists"
            ],
            "timeStamp": timeStamp,
            "pinupData": [
              {
                "link": link
              }
            ],
            "token": xtoken

});
    }else{

      res.json({
        "success": "true",
        "message": 'Pinup data fetched Successfully',
        "timeStamp":timeStamp,
        "pinupData": [
    {
      "link": link,
      "title": title,
      "imageUrl": imageUrl,
      "topic": topic,
      "description": description,
      "mainLInk": mainLink,
      "liked": liked,
      // "unliked": 5,
      "views": views
    }
  ],
        "token": token
      });
    }
});
});
/////////////////////////////////////////////////////////////////////////////////////////////////
//response not defined will work out soon
router.get('/removePinup',function(req,res){
  console.log(req.body);
   pinUp.create(req.body,function(err,user){
     var token = jwt.sign(user, SECRET, { expiresIn: 18000 });
    if(err){
        res.send({

            "status": false,
            "message": [
              "Pinup addition failure",
              "Pinup url already exists"
            ],
            "timeStamp": 1487844504000,
            "pinupData": [
              {
                "link": "https://www.tutorialspoint.com/angular2/angular2_services.htm"
              }
            ],
            "token": token

});
    }else{

      res.json({
        "success": true,
        "message": 'Pinup added successfully',
        "timeStamp":1487844504000,
        "pinupData": [
    {
      "link": "https://www.tutorialspoint.com/angular2/angular2_services.htm",
      "title": "Angular2 Services"
    }
  ],
        "token": xtoken
      });
    }
});
});
/////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/updatePinup',function(req,res){
  console.log(req.body);
   pinUp.create(req.body,function(err,user){
     var token = jwt.sign(user, SECRET, { expiresIn: 18000 });
    if(err){
        res.send({

            "status": "false",
            "message": [
              "Pinup editing failure",
    "Pinup Identifier (ID) not set, Pinup Indentifier cannot be blank",
    "Invalid Pinup Identifier (ID), Pinup Identifier doesn't exists",
    "Title not set, Title cannot be blank",
    "Image url not valid, provide a valid url link to scrape"
            ],
            "timeStamp": timeStamp,
            "token": xtoken

});
    }else{

      res.json({
        "success": "true",
        "message": 'Pinup edited successfully',
        "timeStamp":timeStamp,
        "pinupData": [
    {
      "link": link,
      "title": title
    }
  ],
        "token": xtoken
      });
    }
});
});
/////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/getRecentPinup',function(req,res){
  console.log(req.body);
   pinUp.create(req.body,function(err,user){
     var token = jwt.sign(user, SECRET, { expiresIn: 18000 });
    if(err){
        res.send({

            "status": "false",
            "message": [
              "failed to desplay recent pinup Data"
            ],
            "timeStamp": timeStamp,

            "token": xtoken

});
    }else{

      res.json({
        "success": "true",
        "message": 'Fetched the recent pinups Successfully',
        "timeStamp":timeStamp,
        "pinupData": [
          {
            "link": link,
            "title": title,
            "imageUrl": imageUrl,
            "topic": topic,
            "description": description,
            "creationDate": timeStamp,
            "mainLInk": MainLink,
            "liked": liked,
            // "unliked": 5,
            "views": views
          },
          {
            "link": link,
            "title": title,
            "imageUrl": imageUrl,
            "topic": topic,
            "description": description,
            "creationDate": timeStamp,
            "mainLInk": MainLink,
            "liked": liked,
            // "unliked": 5,
            "views": views
          }
  ],
        "token": xtoken
      });
    }
});
});
/////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/updatePinupTopic',function(req,res){
  console.log(req.body);
   pinUp.create(req.body,function(err,user){
     var token = jwt.sign(user, SECRET, { expiresIn: 18000 });
    if(err){
        res.send({

            "status": "false",
            "message": [
              "Pinup editing failure",
    "Pinup Identifier (ID) not set, Pinup Indentifier cannot be blank",
    "Invalid Pinup Identifier (ID), Pinup Identifier doesn't exists",
    "Topic Identifier (ID) not set, Topic Indentifier cannot be blank",
    "Invalid Topic Identifier (ID), Topic Identifier doesn't exists"
            ],
            "timeStamp": timeStamp,
            "token": xtoken

});
    }else{

      res.json({
        "success": "true",
        "message": 'Pinup Topic updated successfully',
        "timeStamp":timeStamp,
        "token": xtoken
      });
    }
});
});



module.exports = router;
