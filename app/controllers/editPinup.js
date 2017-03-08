var express = require('express');
var router  = express.Router();
var pinUp = require('../model/pinupSchema').pinUp;

router.get('/:pinUpId',function (req,res) {
  try {
    console.log(req.params.pinUpId);
    pinUp.findOne({_id:req.params.pinUpId},function (err,data) {
      res.send(data);
    });
  } catch (e) {
    if (e == 401) {
        res.status(401).send("unauthorized user");
    }
    else {
      res.status(400).send("bad parameter request");
    }
  }

});

module.exports = router;
