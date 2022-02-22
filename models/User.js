const {model, Schema} = require('mongoose');

const userSchema = new Schema({
    name: String,
    password: String,
    email: String,
    bio: String,
    photo: String,
    phone: String,
    recentlySignedIn: String
});

module.exports = model('User',userSchema);