const User = require("../models/Register");

exports.userById = (req,res, next, id) => {
    User.findByPk(id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "user not found"
            })
        }
        req.profile =  user // adds profile object in req with user info
        next();
    })
};

exports.hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile.id === req.auth.id
    if (!authorized) {
        return res.status(403).json({
            error: "User is not authorized to perform this action."

        });
    };
};

exports.allUsers = (req, res) => {
    User.findAll({ attributes : ['firstName', 'email']})
    .then((users) => { 
        res.status(200).json({users })
    })
    .catch(err => console.log(err));
}