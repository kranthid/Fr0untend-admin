var mongoose = require('mongoose');


var Schema = mongoose.Schema,
    categoriesSchema;
categoriesSchema = new Schema({
  catid: {
  	type:String,
  	required:true
  },
  title: {
  	type:String,
  	required:true,
    unique: true
  }

});

module.exports = mongoose.model('Category',categoriesSchema);
