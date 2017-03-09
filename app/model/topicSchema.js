var mongoose = require('mongoose');
var BaseSchema = require('./baseSchema').BaseSchema;
var topicSchema = new BaseSchema({
    topic: String
});

module.exports = mongoose.model("topic", topicSchema);
