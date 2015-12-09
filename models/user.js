var mongoose = require('mongoose');


var Schema = mongoose.Schema,
    usersSchema;
usersSchema = new Schema({
  username: {
  	type:String,
  	required:true,
    unique: true
  },
  password: {
  	type:String,
  	required:true
  },
  uid:{
  	type:String,
  	required:true
  }
});

module.exports = mongoose.model('User',usersSchema);
