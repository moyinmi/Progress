const express = require('express');
const {userById, allUsers} = require('../controllers/register');

const router = express.Router();

router.get('/users', allUsers);


router.param("userId", userById) //any route with user id will execute userBYId

module.exports = router;