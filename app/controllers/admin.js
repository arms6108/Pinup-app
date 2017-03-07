var express = require('express');
var app = express();
var router = express.Router();
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

var admin = require('../model/admin');
var SECRET = 'shhhhhhared-secret';
app.use('/api', expressJwt({secret: SECRET}));

router.post('/register',function(req,res){
  console.log(req.body);
   admin.create(req.body,function(err,user){
    if(err){
        res.send({
  "status": false,
  "message": "Admin registeration failed"
})
    }else{
      var token = jwt.sign(user, SECRET, { expiresIn: 18000 });
      res.json({
        success: true,
        message: 'Admin registerated successful',
        token: token
      });
    }
});
});
module.exports = router;
