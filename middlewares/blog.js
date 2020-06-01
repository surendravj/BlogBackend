exports.isBlogger = (req, res, next) => {
    if (!req.user.isBlogger) {
        return res.status.json({ error: "Sorry you are not a blogger kindly create your blog account and return here" });
    }
    next();
}