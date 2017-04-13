var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema({
    recipe_name: String,
    recipe_detail: String,
    recipe_image: {path:String,contentType:String}
});

var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = mongoose.model('Recipe', recipeSchema);