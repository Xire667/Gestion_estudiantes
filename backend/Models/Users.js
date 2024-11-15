//Users.js

const { Sequelize, DataTypes } = require("sequelize")

const sequelize = require('../db')

const User = sequelize.define('User', {
    id_user:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userName:{
        type:DataTypes.STRING,
        allowNull: false
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false
    }
})

module.exports = User;