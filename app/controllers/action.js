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

        SECRET = 'thisispinuplike';
        console.log("value:::",req.headers.cookie);
        var pinupCookieValue = (req.headers.cookie===undefined?[]:JSON.parse(cookie.parse(req.headers.cookie).pinuplike));
        console.log("after cookies::",pinupCookieValue);

        if (pinupCookieValue.indexOf(pinupID) !== -1) {
            res.send({
                "message": "Opinion already been taken into consideration"
            });
        } else {
            pinupCookieValue.push(pinupID);

                    pinupCookieSerialize = JSON.stringify(pinupCookieValue); //+"_"+SECRET;

                    res.setHeader('Set-Cookie', cookie.serialize('pinuplike', pinupCookieSerialize, {
                        httpOnly: true,
                        maxAge: 60
                    }));
                    console.log("Initial condition");
                    if (req.body.like === true || req.body.unlike === false) {
                        condition.$inc = {
                            like: 1
                        };
                    } else if (req.body.like === false || req.body.unlike === true) {
                        condition.$inc = {
                            unlike: 1
                        };
                    }
                    console.log("like condition", condition);
                    pinUp.findByIdAndUpdate(pinupID, condition, function(err, data) {
                        console.log(err, data);
                        res.send("success");
                    });

        }
        //  res.send("already");


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

