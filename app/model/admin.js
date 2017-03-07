var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
	username: {
  	type: String,
  	required: true,
  	trim: true,
  	lowercase: true,
  	unique: true,
  	required:[true, '{PATH} is required.'],
  	match : [
      	new RegExp('^[a-z0-9_.-]+$', 'i'),
      	'{PATH} \'{VALUE}\' is not valid. Use only letters, numbers, underscore or dot.'
  	],
  	minlength:5,
  	maxlength:60,
	},
	password: {
  	type: String,
  	required: false,
  	trim: true,
		match: new RegExp('^([a-zA-Z+]+[0-9+]+[&@!#$%*+]+)$'),
	},
  emailAddress: {
    	type: String,
    	trim: true,
    	lowercase: true,
    	unique: true,
			match: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
  	}
  });

module.exports= mongoose.model('admin', adminSchema);
