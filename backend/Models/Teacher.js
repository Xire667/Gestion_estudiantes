//Students.js

const { Sequelize, DataTypes } = require("sequelize")

const sequelize = require('../db')

const Teacher = sequelize.define('Teacher', {
    id_teacher:{
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

module.exports = Teacher;