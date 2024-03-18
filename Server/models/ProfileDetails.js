const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    id: String,
    name: String,
    picture: String,
    email: String,
    bio: String,
    skills:[String]
});

module.exports = mongoose.model('Profile', profileSchema);
