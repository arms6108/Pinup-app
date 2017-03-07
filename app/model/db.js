var mongoose = require('mongoose');
 var url ='mongodb://localhost/pinup';
 exports.connect = function(){
   mongoose.connect(url);
 };
