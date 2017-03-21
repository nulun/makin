var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema({
    recipe_name: String,
    food_materials: String,
    cook_time: String,
    tips: String,
    recipe_image: Boolean
});

var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = mongoose.model('Recipe', recipeSchema);

