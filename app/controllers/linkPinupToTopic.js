var express = require('express');
var router  = express.Router();
var pinUp = require('../model/pinupSchema').pinUp;

router.post('/',function (req,res) {
  pinUp.findByIdAndUpdate(pinupID,topicID,function (args) {
    
  });
});

module.exports = router;
