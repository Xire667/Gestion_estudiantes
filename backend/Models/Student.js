//Students.js

const { Sequelize, DataTypes } = require("sequelize")

const sequelize = require('../db')

const Student = sequelize.define('Student', {
    id_student:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dni:{
        type:DataTypes.STRING,
        allowNull: false
    },
    firtsNames:{
        type:DataTypes.STRING,
        allowNull: false
    },
    lastNames:{
        type:DataTypes.STRING,
        allowNull: false
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false
    },
    phone:{
        type:DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Student;