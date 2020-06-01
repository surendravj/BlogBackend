const router = require('express').Router();
const { createBlog, getBlog, getBlogById, getPhoto, getAllBlogs } = require('../controllers/blog');
const { isBlogger } = require("../middlewares/blog");
const { getUserById } = require("../controllers/user");
const { ensureAuthenticated, checkAuthenticator } = require('../middlewares/auth.');
const { isUserEmailVerified } = require('../middlewares/user')

// params
router.param("userId", getUserById);
router.param("blogId", getBlogById);


// routings
router.post("/user/:userId/blog/create", ensureAuthenticated, checkAuthenticator, isUserEmailVerified, isBlogger, createBlog);
router.get("/blog/:blogId", getBlog);
router.get('/blog/:blogId/photo', getPhoto);
router.get('/blogs', getAllBlogs);



module.exports = router;



