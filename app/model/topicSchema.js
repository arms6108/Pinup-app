var mongoose = require('mongoose');

var topicSchema = new mongoose.Schema({
    topic: String
});

module.exports = mongoose.model("topic", topicSchema);
