const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

sequelize =  new Sequelize(process.env.DATABASE_URL, {
    host: 'localhost',
    dialect: 'mysql',
    
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  });

  module.exports = sequelize;

