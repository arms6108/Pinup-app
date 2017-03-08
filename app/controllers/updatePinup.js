var express = require('express');
var router  = express.Router();
var pinUp = require('../model/pinupSchema').pinUp;

router.post('/:pinUpId',function (req,res) {
  try {
    console.log(req.params.pinUpId);
    pinUp.findByIdAndUpdate({_id:req.params.pinUpId},{title:req.body.title,imageUrl:req.body.imageUrl,description:req.body.description,tags:req.body.tags},function (err,data) {
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
