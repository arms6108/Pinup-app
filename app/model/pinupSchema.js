var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pinupSchema = new Schema({
  pinupUrl:{
    type:String,
    required:true
  },
  timeStamp:{
    type:Number,
    required:true
  },
  pinupId:{
    type:Number,
    required:true
  },
  xtoken:{
    type:String,
    required:true
  },
  title:{
    type:String
  },
  link:{
    type:String
  },
  MainLink:{
    type:String
  },
  imageUrl:{
    type:String
  },
  description:{
    type:String
  },
  tags:{
    type:String
  },
  topic:{
    type:String
  },
  topicId:{
    type:Number
  },
  liked:{
    type:Number
    // ,
    // required:true
  },
  views:{
    type:Number
    // ,
    // required:true
  }
});

var pinUp = module.mongoose('pinup',pinupSchema);
module.exports = pinUp;
