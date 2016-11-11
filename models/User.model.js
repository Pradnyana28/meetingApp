var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String
});

// Capitalize username before saving value
userSchema.pre('save', function(next) {
    this.username.charAt(0).toLocalUpperCase() + this.username.slice(1);
    next();
});

module.exports = mongoose.model('User', userSchema);
