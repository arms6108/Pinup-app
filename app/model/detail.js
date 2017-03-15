var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    util = require("util"),
    EventEmitter = require("events").EventEmitter;

var visitorSchema = new Schema({
    device: String,
    browser: String
});

var visit = mongoose.model('visit', visitorSchema);

function Details() {
    EventEmitter.call(this);
}

util.inherits(Details, EventEmitter);

Details.prototype.savenow = function(data, cb) {
    var visitors = new visit(data);
    visitors.save(function(error, result) {
        if (error) {
            return cb(error, null)
        } else if (data) {
            return cb(null, result);
        }
    });

};
module.exports = new Details;
