var controllers = require('../controllers');
var passport = require('passport');
var multer  = require('multer')
var upload = multer({ dest: 'public/uploads/' })
module.exports = function (app) {
  app.post('/create/item', controllers.createRecipe);
  app.get('/item/:id',controllers.getRecipeById);
  app.get('/item/:category/all',controllers.getRecipeByCategory);
  app.delete('/item/:id',controllers.deleteRecipeById);
  app.put('/item/update/:id',controllers.updateRecipeById);
  app.post('/user/create',controllers.createUser);
  app.get('/user/:id',controllers.getUserById);
  app.put('/user/:id',controllers.updateUserById);
  app.delete('/user/:id',controllers.removeUserById);
  app.post('/create/category',controllers.createCategory);
  app.put('/update/category/:id',controllers.updateCategory);
  app.delete('/delete/category/:id',controllers.deleteCategory);
  app.get('/categories/all',controllers.getListOfCategories);
  app.get('/category/:id',controllers.getCategoryById);
  app.post('/image/upload', upload.single('avatar'),controllers.recipeImageUpload);
  app.get('fail',function(req,res){
  	res.send({username:null,auth_status:false});
  })
  //Login and signup
 	app.post('/register',controllers.register);
	app.post('/login', passport.authenticate('local', { failureRedirect: '/fail'}),function(req, res) {
		if(req.user.length>0){
			res.send({username:req.user[0].short_name,auth_status:true})	
		}else{
			res.send({username:'',auth_status:false})
		}
    	
  	});
};
