const nodemailer = require('nodemailer');
const user = require('../models/user');
const jwt = require('jsonwebtoken');



exports.sendVertificationCode = (req, res) => {
    var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "vadaparthysurendra@gmail.com",
            pass: "pottikothe"
        }
    });

    mailOptions = {
        from: "vadaparthysurendra@gmail.com",
        to: req.body.email,
        subject: "This the OTP for your new blog account please enter this OTP in your blog account to confirm your account",
        html: "The OTP =" + req.otpCode
    }

    smtpTransport.sendMail(mailOptions, (err, response) => {
        if (err) {
            return res.status(404).json({ error: err });
        }
        return res.status(200).json({ success: "user saved succesfully" })
    });
}

exports.signin = (req, res) => {
    const { email, password } = req.body;
    user.findOne({ email }).exec((err, User) => {
        if (err) {
            return res.json(401).json({ error: "Something went wrong" });
        }
        if (!User) {
            return res.status(401).json({ error: "Account not exist with the email" });
        }
        if (password != User.password) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const token = jwt.sign({ _id: User._id }, "blog");
        res.cookie = ("token", token, { expire: Date.now() + 9999 });
        const { _id, name, email, isEmailVerified, isBlogger, contactNo, role, blogCount } = User;
        return res.status(200).json({ "token": token, user: { _id, name, email, isEmailVerified, isBlogger, contactNo, role, blogCount } });
    });
}

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({ success: "User signout succesfullt" });
}