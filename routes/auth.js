const express = require('express');
const {signup, signin, signout} = require('../controllers/auth');
const {userById} = require('../controllers/register');
const {userSignupValidator} = require('../validator');


const router = express.Router();

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);


router.param("userId", userById) //any route with user id will execute userBYId

module.exports = router;