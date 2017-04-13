var express = require('express');
var Recipe = require('../models/recipe');
var router = express.Router();
var fs = require('fs');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
router.get('/', function(req, res, next) {
		if (req.user) {
			res.render('share');
			console.log(req.user.username+"打开了分享页面");
		}else{
			res.render('login');
			console.log("未登陆，跳转到登陆页面");
		}
});

router.post('/', upload.single('recipe_image'), function(req, res, next) {
	if (req.user) {
		var recipeEntity = new Recipe({ recipe_name: req.body.recipe_name, recipe_detail:req.body.recepe_detail });
		console.log("图片已上传");
		console.log(req.file);
		//console.log(typeof(req.file.path));
		recipeEntity.recipe_image.path = req.file.path;
		recipeEntity.recipe_image.contentType = req.file.mimetype;
		recipeEntity.save();
		res.status(200).send("shared successful!");
		}else{
		res.render('login');
		console.log("未授权无法分享，跳转到登陆页面");
	}
});

module.exports = router;