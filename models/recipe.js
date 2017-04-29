var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema({
  name: String,
  foreword: String,
  image: { 
    path: String, 
    contentType: String 
  },
  procedure: { 
    image /*path*/ : String, 
    guide: String, 
    tools: String 
  },
  difficulty: {
    type: String,
    enum: ["简单", "一般", "较难", "困难"]
  },
  time: Number,
  materials: String,
  tags: Array,
  chef: String,
  date: { 
    type: Date, 
    default: Date.now 
  },
  private: { 
    type: Boolean, 
    default: false 
  },
  rate: [{
    user: String,
    rate: {
      type: Number,
      enum: [1, 2, 3, 4, 5]
    }
  }]
});

var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

