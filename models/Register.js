const Sequelize = require('sequelize');
const db = require('../config/db');
const Post = require('./Post')


const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});


User.sync({ force: false}).then(() => {
  console.log('table created');
});

User.hasMany(Post);
Post.belongsTo(User);


module.exports = User;