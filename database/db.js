const {Sequelize} = require('sequelize')

const sequelize = new Sequelize("quizz", "rmtomal", "Rmtomal10@", {
    host: "localhost",
    dialect: 'mysql',
    logging: true
});

module.exports = sequelize