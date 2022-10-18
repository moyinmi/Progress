const User = require('../models/Register');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
require('dotenv').config();
const bcrypt = require('bcryptjs');


// create user
exports.signup = async (req,res) => {

    // check if the user already exists in the database
    const userExists = await User.findOne({where: {email: req.body.email}});
    if (userExists) return res.status(400).send('Email already exists');


    // hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //create a new user
    const user = new User ({
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        // res.send(savedUser); sends all the info of the saved user
        res.status(200).json({message: 'signup success'})
    }catch (err){
        res.status(400).send(err);
    }

}


exports.signin = async (req, res) => {
    //find user based on email
    const user = await User.findOne({where: {email: req.body.email}});
        if (!user) return res.status(400).send('Email  is not found');

        //password is correct
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send('Invalid password');



        //generate a token with user id and secret
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
        //res.header('auth-token', token).send(token);

        //persist the token as "t" in cookie with encrypt
        res.cookie("t", token, {expire: new Date() + 9999});
        //return response wth user and token to frontend client
        const {id, email} = user;
        return res.json({token, user:{id, email} });

    };

exports.signout = (req, res) => {
    res.clearCookie("t");
    return res.json({message: "signout success! "})
};


exports.requireSignin = expressJwt({
    // if the token is valid expressjwt appends the verified users id in an auth key to the request object
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
})