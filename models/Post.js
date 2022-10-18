const Sequelize = require('sequelize');

const db = require('../config/db');


const Post = db.define('post', {
  uuid: {
    type: Sequelize.UUID
  },
  userId: {
    type:Sequelize.STRING
  },
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  }
});


Post.sync({force: false}).then(() => {
  console.log(' Post table created');
});

module.exports = Post;
