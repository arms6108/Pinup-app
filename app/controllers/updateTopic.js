var express = require('express');
var router = express.Router();
var topicSchema = require('../model/topicSchema');

router.post('/', function(req, res) {
    var token = req.headers['x-token'];
    try {
        var topicID = req.body.topicID;
        var testTopic = topicSchema.find({
            topic: req.body.topic,
            _id: {
                $ne: topicID
            }
        }, function(errr, data) {
            console.log("data", data);
            if (data.length !== 0) {
                // throw 409;
                res.status(409).send({
                    "status": false,
                    "message": "Topic already exist",
                    "token": token
                });
            } else {
                topicSchema.findByIdAndUpdate(topicID, {
                    topic: req.body.topic
                }, function(err, data) {
                    // console.log("data",data);
                    var dataResponse = {
                        "status": true,
                        "message": "Topic edited successfully",
                        "token": token
                    };
                    res.send(dataResponse);
                });
            }
        });
        // console.log(testTopic);



    } catch (e) {
        if (e == 401) {
            res.status(401).send({
                "status": false,
                "message": [
                    "topic editing failure",
                    "optic Identifier (ID) not set, topic Indentifier cannot be blank",
                    "Invalid topic Identifier (ID), topic Identifier doesn't exists"
                ],
                "token": token
            });
        } else if (e == 409) {
            res.status(409).send({
                "status": false,
                "message": "topic already exist",
                "token": token
            });
        } else {
            res.status(400).send("bad parameter request");
        }
    }
});

module.exports = router;
