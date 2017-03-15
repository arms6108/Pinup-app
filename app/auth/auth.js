var cookieSession = require('cookie-session'),
    express = require('express'),
    app = express(),
    jwt = require('jsonwebtoken'),
    config = require('../config');

  app.set('superSecret', config.secret);

module.exports = function(req,res,next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'unauthorized access'
    });

  }
};
