var express = require('express');
var app = express();
var router = express.Router();
var com = require('../common/common');
var pinUp = require('../model/pinupSchema').pinUp;
var visitor = require('../model/detail');
var cookie = require('cookie');
var cookieParser = require('cookie-parser');

router.post('/action', function(req, res) {
    try {

        var condition = {};
        pinupID = req.body.pinupID;
        alreadyCookie = [];
        SECRET = 'thisispinuplike';

        console.log("cookies:",cookie);
        //console.log(cookie.parse(req.headers.cookie[pinupID]));
        // Parse the cookies on the request
        console.log("log of pin",typeof cookie);

        if (typeof cookie !== undefined) {
          console.log("hello");
          //var cookies = cookiejs.parse('foo=bar; cat=meow; dog=ruff');
          if((typeof cookie.pinuplike) !== "undefined"){
              console.log("clicked");
              console.log(cookie.pinuplike);
            //JSON.parse
            //check the JSON Object for req.body.pinupID;
            //if(pinupid exists)
            //alert already linked
            //else
            // JSON already Cookie
            //setcookie for pinuplike
          }else if((typeof cookie.pinupunlike) !== "undefined"){
console.log("clicked again");
          }
        //  res.send("already");
      else{
          console.log("entered for setheader");
          pinupCookieValue = pinupID;//+"_"+SECRET;
          //alreadyCookie.push(pinupCookieValue);
          //pinuplikeObj = {"pinuplike": alreadyCookie};
          //var cookieValue = JSON.stringify(pinuplikeObj, { maxAge: null, httpOnly: true});
          //console.log(cookie.serialize(pinuplikeObj));
          // Get the visitor name set in the cookie
          //  var name = cookies.name;
          res.setHeader('Set-Cookie', cookie.serialize('pinuplike', pinupCookieValue, {
            httpOnly: true,
            maxAge: null
          }));
          console.log("");
            if (req.body.like === true) {
                condition.$inc = {
                    like: 1
                };
            } else if(req.body.unlike === true) {
                condition.$inc = {
                    unlike: 1
                };
            }
            pinUp.findByIdAndUpdate(pinupID, condition, function(err, data) {
                console.log(err, data);
                res.send("success");
            });
        }
        }
        console.log("leave");
    } catch (e) {
        console.log(e);
        if (e == 401) {
            res.status(401).send({
                "status": false,
                "message": "Pinup Identier doesnt exist"
            });
        }
    }

});

module.exports = router;
