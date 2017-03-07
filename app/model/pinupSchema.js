var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
var BaseSchema = require('./baseSchema').BaseSchema;


var topic = require('./topicSchema');

var pinupSchema = new BaseSchema({
  pinupUrl:{
    type:String,
    required:true,
    unique:true
  },
  title:{
    type:String,
    require:false
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
    type:mongoose.Schema.Types.ObjectId,
    ref: 'topic',
    required:false
  },
  like:{
    type:Number,
    default:0,
    required:false
  },
  unlike:{
    type:Number,
    default:0,
    required:false
  },
  views:{
    type:Number,
    default:0,
    required:false
  }
});



module.exports = {
    pinUp : mongoose.model('pinup',pinupSchema),
    };
