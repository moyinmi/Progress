const express = require('express');
const {getPosts, createPost} = require('../controllers/post');
const {requireSignin} = require('../controllers/auth');
const { userById} = require("../controllers/register");
const {createPostValidator} = require('../validator');


const router = express.Router();

router.get("/", getPosts);
router.post('/post', requireSignin, createPostValidator, createPost );


router.param("userId", userById) //any route with user id will execute userBYId

module.exports = router;