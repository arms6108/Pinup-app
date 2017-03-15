var mongoose = require('mongoose');
var BaseSchema = require('./abstract').BaseSchema;
var topicSchema = new BaseSchema({
    topic: String
});
// specify the transform schema option
if (!topicSchema.options.toObject) topicSchema.options.toObject = {};
topicSchema.options.toObject.transform = function (doc, ret, options) {
  // remove the _id of every document before returning the result
  ret.topicID = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
};
module.exports = mongoose.model("topic", topicSchema);
