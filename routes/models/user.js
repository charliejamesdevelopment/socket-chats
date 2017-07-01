var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  color: String
});
userSchema.set('collection', 'users');
var User = mongoose.model('User', userSchema);

module.exports = User;
