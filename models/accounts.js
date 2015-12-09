var mongoose = require('mongoose');


var Schema = mongoose.Schema,
    accountsSchema;
accountsSchema = new Schema({
  email: {
  	type:String,
  	required:true
  },
  password: {
  	type:String,
  	required:true
  },
  contact:{
  	type:Number,
  	required:true
  },
  short_name:{
    type:String,
    required:true
  }

});

module.exports = mongoose.model('Account',accountsSchema);
