var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var profileSchema = new Schema({
  username: String,
  name: String,
  avatar: {
    path: String,
    contentType: String
  }
});

var Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;

