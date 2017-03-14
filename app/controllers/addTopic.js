var express = require('express');
var router = express.Router();
var pinUp = require('../model/pinupSchema').pinUp;
var topicSchema = require('../model/topicSchema');
var common = require('../common/common');
var com = new common();

router.post('/', function(req, res) {
    var token="adsfhjkadfhlasdfhladsfl";
    try {
            console.log(req.body);
        var data = {
            topic: req.body.topic,
        };
        var addTopic = com.topicSave(data, function(err, dataLocal) {
            console.log("data",dataLocal);
            res.json({
                "status": true,
                "topicData":dataLocal,
                "message": "Topic added successfully",
                "token": token
            });
        });


    } catch (e) {
        res.status(401).send({
            "status": "false",
            "message": [
                "Topic addition failure",
                "Topic already exists for the sub domain"
            ],
            "token": token
        });
    }
});

module.exports = router;
