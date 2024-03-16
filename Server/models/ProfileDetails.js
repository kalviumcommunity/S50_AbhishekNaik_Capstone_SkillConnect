const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    sub: String,
    name: String,
    picture: String,
    email: String,
    bio: String,
    skills:[String]
});

module.exports = mongoose.model('Profile', profileSchema);
