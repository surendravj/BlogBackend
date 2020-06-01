exports.verifyOTP = (req, res, next) => {
    if (req.body.otp != req.user.otpCode) {
        return res.status.json({ error: "OTP is invalid or expired" })
    }
    next();
}

exports.isUserEmailVerified = (req, res, next) => {
    if (!req.user.isEmailVerified) {
        return res.status(401).json({ error: "Email is not verified please verify your email" });
    }
    next();
}







