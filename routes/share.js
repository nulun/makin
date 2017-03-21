var express = require('express');
var router = express.Router();

router.get('/share', function(req, res) {
    res.render('share');
});

router.post('/share', function(req, res) {
    var recipeEntity = new Recipe({ recipe_name: req.body.recipe_name }, { food_materials: req.body.food_materials }, { cook_time: req.body.cook_time }, { tips: req.body.tips });
    console.log(recipeEntity.tips);
    recipeEntity.save();
    res.status(200).send("shared successful!");
});

module.exports = router;