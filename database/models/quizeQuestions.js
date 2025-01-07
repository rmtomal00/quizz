const sequelize = require("../db")
const {DataTypes} = require("sequelize")

const Question = sequelize.define("questions", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    question:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    exam: {
        type: DataTypes.JSON,
        allowNull: true
    },
    subject:{
        type: DataTypes.STRING,
        allowNull: false
    },
    options: {
        type: DataTypes.JSON,
        allowNull: false
    },
    ans: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: "questions",
    timestamps: false
})

module.exports = Question;