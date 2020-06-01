const router = require("express").Router();
const { ensureAuthenticated, checkAuthenticator } = require('../middlewares/auth.');
const { getUserData, getUserById, updateUser, getPhoto, verifyAccount, createBlogAccount } = require('../controllers/user');
const { verifyOTP, isUserEmailVerified } = require("../middlewares/user");
// params

router.param("userId", getUserById);


// routing

router.get("/user/:userId", ensureAuthenticated, checkAuthenticator, getUserData);
router.get('/user/:userId/photo', getPhoto);
router.put("/user/:userId/edit", ensureAuthenticated, checkAuthenticator, updateUser);
router.put("/user/:userId/verify/account", ensureAuthenticated, checkAuthenticator, verifyOTP, verifyAccount);
router.put('/user/:userId/createBlog', ensureAuthenticated, checkAuthenticator, isUserEmailVerified, createBlogAccount);


module.exports = router;