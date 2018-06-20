var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var loginSchema = new Schema({
  username: String,
  password: String
});


var Login = mongoose.model('login', loginSchema);
module.exports = Login;