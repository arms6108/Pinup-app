var mongoose = require('mongoose'),
    url = 'mongodb://localhost/pinup';
mongoose.set('debug', function (coll, method, query, doc ) {
  console.log(query);
});
exports.connect = function() {
    mongoose.connect(url);
};
