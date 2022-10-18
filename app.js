const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
//const Post = require("./models/Post");
//const User = require("./models/Register");


// Database
const db = require('./config/db');

// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

//routes
const postRoute = require("./routes/post");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(expressValidator());

//auth
app.use("/", authRoute); 
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json("unauthorized");
  } 
});
//post
app.use('/', postRoute);
//user
app.use('/', userRoute);

 
sequelize
  .sync()
  .then(result => {
       //console.log(result);
    app.listen(3000 , () => {
      console.log("Server is running")});
  })
  .catch(err => {
    console.log(err);
  });



