var Recipe = require('../models/recipe');
var User = require('../models/user');
var Account = require('../models/accounts');
var Category = require('../models/categories');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var _ = require('underscore');
var fs = require('fs');


passport.serializeUser(function(user, done) {
  console.log("checking serializeUser >>",user)
  if(!user.length){
  	console.log("no users data >>>>")
  	done(null,[]);
  }else if(!user[0]){
    console.log("serializeUser if conditon >>")
    done(null, user._id);
  }else{
    console.log("else block for serializeUser",user)
    done(null, user[0]._id);    
  }
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user){
        if(!err) done(null, user);
        else done(err, null);
    })
});
exports.createRecipe = function(req,res){
	  var foodItem = new Recipe();
	  foodItem.category = req.body.category;
	  foodItem.name = req.body.name;
	  foodItem.price = req.body.price;
	  foodItem.imageUrl =req.body.imageUrl;
	  foodItem.status = req.body.status;
	  foodItem.save(function(err){
	  	if(err){
	  			res.send("Error while saving data ",err);
	  		}
	  	else{
	  		res.status(200);
	  		res.json({message:"Food item was added successfully"});
	  	}
	  })
}

exports.getRecipeById = function(req,res){
	  var foodItemId = req.params.id;
	  Recipe.findById(foodItemId,function(err,data){
	  	if(err){
	  			res.status(500);
	  			res.send("Error while getting data ",err);
	  		}
	  	else{
	  		res.status(200);
	  		res.json({item:data});
	  	}
	  });
}

exports.getRecipeByCategory = function(req,res){
	var category = req.params.category;
	Recipe.find(category,function(err,data){
	  	if(err){
	  			res.status(500);
	  			res.send("Error while getting data ",err);
	  		}
	  	else{
	  		res.status(200);
	  		res.json({all_items:data});
	  	}
	});
}
exports.deleteRecipeById = function(req,res){
	var id = req.params.id;
	console.log("Id is >>>",id);
	Recipe.remove({_id:id},function(err,data){
		console.log("Data is >>>",data);
		if(err){
  			res.status(500);
  			res.send("Error while deleting data ",err);
  		}
	  	else{
	  		res.status(200);
	  		res.json({message:"Deletion was successful"});
	  	}
	});

}

exports.updateRecipeById = function(req,res){
	var id = req.params.id;
	console.log("Id is >>>",id);
	var update_object = {
		"imageUrl": req.body.imageUrl,
		"price": req.body.price,
		"name": req.body.name,
		"category": req.body.category,
		"status":req.body.status
	};
	console.log("updateing data >>>",update_object);
	Recipe.update({_id:id},update_object,{upsert:true},function(err,data){
		console.log("Data is >>>",data);
		if(err){
  			res.status(500);
  			res.send("Error while deleting data ",err);
  		}
	  	else{
	  		res.status(200);
	  		res.json({updated_item:data});
	  	}		
	})

}

exports.createUser = function(req,res){
	  var user = new User();
	  user.username = req.body.username;
	  user.password = req.body.password;
	  user.uid = req.body.uid;
	  user.save(function(err){
	  	if(err){
	  			res.send("Error while saving data ",err);
	  		}
	  	else{
	  		res.status(200);
	  		res.json({message:"User data was added successfully"});
	  	}
	  })
}
exports.getUserById = function(req,res){
	  var userId = req.params.id;
	  User.findById(userId,function(err,data){
	  	if(err){
	  			res.status(500);
	  			res.send("Error while getting data ",err);
	  		}
	  	else{
	  		res.status(200);
	  		res.json({item:data});
	  	}
	  });
}
exports.updateUserById = function(req,res){
	  var Id = req.params.id;
	var update_object = {
		"uid" : req.body.uid,
        "password" : req.body.password,
        "username" : req.body.username,
	};
	console.log("updateing data >>>",update_object);
	User.update({_id:Id},update_object,{upsert:true},function(err,data){
		console.log("Data is >>>",data);
		if(err){
  			res.status(500);
  			res.send("Error while deleting data ",err);
  		}
	  	else{
	  		res.status(200);
	  		res.json({updated_item:data});
	  	}		
	})
}
exports.removeUserById = function(req,res){
	var Id = req.params.id;
	User.remove({_id:Id},function(err,data){
		console.log("Data is >>>",data);
		if(err){
  			res.status(500);
  			res.send("Error while deleting data ",err);
  		}
	  	else{
	  		res.status(200);
	  		res.json({message:"Deletion was successful"});
	  	}
	});
}
exports.register = function(req,res){
	 var email = req.body.email;
	 var password  = req.body.password;
	 var contact = req.body.contact;
	 var short_name = req.body.short_name
	Account.findOne({'email':email},function(err,user){
		if(err){
			res.status(500)
			res.send({message:"Error in finding user details>>"+err})
		}else if(user){
			res.status(400)
			res.send({message:"User already exist in database..Try it with new one"})
		}else{
			var newUser = new Account();
		       newUser.email = email;
		       newUser.password = password;
		       newUser.contact = contact;
		       newUser.short_name = short_name;
			newUser.save(function(err,accountDetails){
				if(!err){
					console.log("data status>>>",accountDetails);
					res.status(200);
					res.send({message:"user details saved into our database"});
				}else{
					res.send({message:"problem in storing into databse >>"+err});
				}
			})
		}
	})
}
exports.createCategory = function(req,res){
	  var categoryItem = new Category();
	  categoryItem.catid = req.body.catid;
	  categoryItem.title = req.body.title;
	  categoryItem.save(function(err){
	  	if(err){
	  			res.send("Error while saving data ",err);
	  		}
	  	else{
	  		res.status(200);
	  		res.json({message:"Category item was added successfully"});
	  	}
	  })
}
exports.updateCategory = function(req,res){
	var id = req.params.id;
	console.log("Id is >>>",id);
	var update_object = {
		"catid": req.body.catid,
		"title": req.body.title
	};
	console.log("updateing data >>>",update_object);
	Category.update({_id:id},update_object,{upsert:true},function(err,data){
		console.log("Data is >>>",data);
		if(err){
  			res.status(500);
  			res.send("Error while deleting data ",err);
  		}
	  	else{
	  		res.status(200);
	  		res.json({updated_item:data});
	  	}		
	})
}
exports.deleteCategory = function(req,res){
	var Id = req.params.id;
	Category.remove({_id:Id},function(err,data){
		console.log("Data is >>>",data);
		if(err){
  			res.status(500);
  			res.send("Error while deleting data ",err);
  		}
	  	else{
	  		res.status(200);
	  		res.json({message:"Deletion was successful"});
	  	}
	});
}
exports.getListOfCategories = function(req,res){
	Category.find({},function(err,data){
	  	if(err){
	  			res.status(500);
	  			res.send("Error while getting data ",err);
	  		}
	  	else{
	  		res.status(200);
	  		res.json({all_categories:data});
	  	}
	});
}
exports.getCategoryById = function(req,res){
	var id = req.params.id;
	  Category.findById(id,function(err,data){
	  	if(err){
	  			res.status(500);
	  			res.send("Error while getting data ",err);
	  		}
	  	else{
	  		res.status(200);
	  		res.json({category:data});
	  	}
	  });
}
exports.recipeImageUpload = function(req,res){
	console.log("uploading file >>>>>>");
	console.log("file is >>>",req.file);
	if(req.file.size < 500000){
		if(req.file.mimetype == 'image/jpeg' ||req.file.mimetype == 'image/png' || req.file.mimetype == 'image/jpg' ){
			//res.send({message:"File upload was done",path:req.file.path});
			//var serverPath = req.file.path+'\\'+req.file.originalname;
			var serverPath = req.file.path.split("\\")[0]+'\\'+req.file.originalname;
			console.log("+++++++++++",serverPath);
/*			fs.readFile(req.file.path, function (err, data) {
			  if (err) throw err;
			  // data will contain your file contents
			  	console.log(data)  
			  	res.send(data);   
			});*/
			fs.rename(req.file.path,serverPath,function(err,data){
				if(err){
					res.send("Some error occured>>",err);
				}else{
					res.send({path:serverPath});
				}
			})
		}else{
			res.send({message:"File format not supported"})
		}

	}else{
		res.send({message:"File size exceeded"});
	}
}
passport.use(new LocalStrategy(function(username, password, done) {
  console.log("username is >>>>>>",username);
  console.log("password is >>",password);
    Account.find({email:username,password:password}, function(err, user) {
      console.log("err is >>>>",err);
      console.log("user is >>>>",user);
      if (err) {
        return done(err);
      }else if (!err){
        return done(null,user)
      }else if (!user) {
        return done(null, false);
      }
    });
}));