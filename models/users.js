var mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    createDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Users', UserSchema)