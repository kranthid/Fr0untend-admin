var mongoose = require('mongoose');


var Schema = mongoose.Schema,
    recipesSchema;
var statuses = ["Avaliable","Not Avaliable","After 1 h"]
recipesSchema = new Schema({
  category: {
  	type:String,
  	required:true
  },
  name: {
  	type:String,
  	required:true,
    unique: true
  },
  price:{
  	type:Number,
  	required:true
  },
  imageUrl:{
  	type:String
  },
  status: {
    type: String,
    enum: statuses,
    required:true
  }
});

module.exports = mongoose.model('Recipe', recipesSchema);
