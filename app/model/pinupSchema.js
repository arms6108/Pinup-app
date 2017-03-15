var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
var BaseSchema = require('./abstract').BaseSchema;


var topic = require('./topicSchema');

var pinupSchema = new BaseSchema({
  pinupUrl:{
    type:String,
    required:true,
    unique:true
  },
  status:{
    type:String
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
  page:{
    type:Number
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

// specify the transform schema option
if (!pinupSchema.options.toObject) pinupSchema.options.toObject = {};
pinupSchema.options.toObject.transform = function (doc, ret, options) {
  // remove the _id of every document before returning the result
  ret.pinupID = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
};

module.exports = {
    pinUp : mongoose.model('pinup',pinupSchema),
    };
