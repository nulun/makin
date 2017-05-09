var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var codeSchema = new Schema({
  postedBy: String,
  title: String,
  code: String,
  date: {
    type: Date,
    default: Date.now
  },
  lang: String,
  likes: [{
  	val: Boolean,
  	by: String
  }],
  comments:[{
  	text: String,
  	postedBy: String
  }]
});

var Code = mongoose.model('Code', codeSchema);

module.exports = Code;

