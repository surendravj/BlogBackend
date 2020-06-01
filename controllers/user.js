const User = require('../models/user');
const formidable = require('formidable');
const _ = require("lodash");

// params controller
exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(401).json({ error: "Unbale to fing the user" });
        }
        req.user = user;
        next();
    })
}


// routing controllers

exports.getUserData = (req, res) => {
    req.user.password = undefined;
    req.user.photo = undefined;
    req.otpCode = undefined;
    return res.json(req.user);
}

exports.updateUser = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {

        if (err) {
            return res.status(400).json({ error: "sommething went wrong" });
        }

        let user = req.user;
        user = _.extend(user, fields);

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
                return res.status(401).json({ error: "Unbale to update the user details" })
            }
            response.photo = undefined;
            return res.json(response);
        });
    })
}

exports.getPhoto = (req, res, next) => {
    if (req.user.photo.data) {
        res.set('content-type', req.user.photo.contentType)
        return res.send(req.user.photo.data);
    }
    next();
}

exports.verifyAccount = (req, res) => {
    let user = req.user;
    user.otpCode = undefined;
    user.isEmailVerified = true;
    user.save((err, response) => {
        if (err) {
            return res.status(401).json({ error: "something went wrong" })
        }
        response.photo = undefined;
        return res.json(response);
    })
}


exports.createBlogAccount = (req, res) => {
    let user = req.user;
    user.isBlogger = true;
    user.save((err, response) => {
        if (err) {
            return res.status(403).json({ error: "Unable to create log try again later" })
        }
        return res.json({ success: "U r blogger now" });
    })
}