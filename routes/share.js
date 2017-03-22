var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
	console.log(req.user);
		if (req.user) {
			res.render('share');
			console.log("用户"+req.user.username+"打开了分享页面");
		}else{
			res.render('login');
			console.log("未登陆，跳转到登陆页面");
		}
});

router.post('/', function(req, res, next) {
    var recipeEntity = new Recipe({ recipe_name: req.body.recipe_name }, { food_materials: req.body.food_materials }, { cook_time: req.body.cook_time }, { tips: req.body.tips });
    recipeEntity.save();
    next();
}, function(req, res){
    console.log(recipeEntity.tips);
    res.status(200).send("shared successful!");
});

module.exports = router;