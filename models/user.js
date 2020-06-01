const mongoose = require('mongoose');

const userSchema = mongoose.Schema({


    name: {
        type: String,
        required: true
    },


    email: {
        type: String,
        required: true
    },


    password: {
        type: String,
        required: true
    },


    otpCode: {
        type: Number,
        default: null
    },

    photo: {
        data: Buffer,
        contentType: String
    },

    isEmailVerified: {
        type: Boolean,
        default: false
    },


    role: {
        type: String,
        default: null
    },


    contactNo: {
        type: Number,
        default: null
    },

    isBlogger: {
        type: Boolean,
        default: false
    },
    blogCount: {
        type: Number,
        default: 0
    }

}, { timestamp: true });


module.exports = mongoose.model("users", userSchema);

