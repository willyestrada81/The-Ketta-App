const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema ({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    password_confirmation: {
        type: String,
        require: true
    },
    user_avatar: {
        type: String,
        default:
            "../public/img/profile-avatar.png"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = 'User';