const formidable = require('formidable');
const User = require('../models/user');
const fs = require("fs");
const expressJwt = require('express-jwt');

exports.signup = (req, res, next) => {
    req.otpCode = Math.floor((Math.random() * 100000) + 5401);
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({ error: "sommething went wrong" });
        }
        const { name, email, password } = fields;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        User.findOne({ "email": email }).exec((err, user) => {
            if (err) {
                return res.status(400).json({ error: "Something went wrong try again" });
            }
            if (user) {
                return res.status(400).json({ error: "Email is in use " });
            } else {
                req.body.email = email;
                var user = new User(fields);
                user.otpCode = req.otpCode;

                if (file.photo) {
                    if (file.photo.size > 4000000) {
                        return res.status(400).json({
                            error: "Image to big to upload"
                        });
                    }
                    user.photo.data = fs.readFileSync(file.photo.path);
                    user.photo.contentType = file.photo.type
                }
                user.save((err, response) => {
                    if (err) {
                        console.log(err);
                    }
                    next();
                });
            }
        })
    });
}


exports.ensureAuthenticated = expressJwt({
    secret: "blog",
    userProperty: "auth"
})

exports.checkAuthenticator = (req, res, next) => {
    let isValidUser = (req.auth && req.user) && req.auth._id == req.user._id;
    if (!isValidUser) {
        console.log(isValidUser);
        return res.status(403).json({ error: "Unauthroized authentication" });
    }
    next();
}

