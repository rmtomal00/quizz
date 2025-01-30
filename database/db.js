const {Sequelize} = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.db_name, process.env.db_user, process.env.db_user_password, {
    host: "localhost",
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize