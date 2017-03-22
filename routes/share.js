var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('share');
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