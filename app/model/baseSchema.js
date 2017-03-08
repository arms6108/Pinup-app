//
// Pipup Schema Base
//
// 'use strict';

var bcrypt = require('bcryptjs'),
    crypto = require('crypto'),
    mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    validate = require('mongoose-validate'),
    util = require('util');

require('mongoose-schema-jsonschema')(mongoose);

var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

function AbstractSchema(){
    Schema.apply(this,arguments);
    this.add({
      isDeleted: {
        type: Boolean,
        default:false
      },
      createdAt :{
        type: Date,
        default: Date.now
      },
      createdBy:{
        type : ObjectId,
        ref : 'User'
      },
      updatedAt:{
        type: Date
      },
      updatedBy:{
        type : ObjectId,
        ref : 'User'
      },
      deletedAt:{
        type: Date
      },
      deletedBy:{
        type : ObjectId,
        ref : 'User'
      }
    });
}
util.inherits(AbstractSchema, Schema);
var BaseSchema = AbstractSchema;

// BaseSchema.pre('save', function(next) {
//   // get the current date
//   var currentDate = new Date();
//
//   // change the updated_at field to current date
//   this.updated_at = currentDate;
//
//   // if created_at doesn't exist, add to that field
//   if (!this.created_at)
//     this.created_at = currentDate;
//
//   next();
// });

module.exports = {
  BaseSchema : BaseSchema
};
