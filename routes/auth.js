const router = require('express').Router();
const { signup } = require('../middlewares/auth.');
const { sendVertificationCode, signin, signout } = require('../controllers/auth');


// routing
router.post('/signup', signup,sendVertificationCode);
router.post("/signin", signin);
router.get('/signout', signout);


module.exports = router;


