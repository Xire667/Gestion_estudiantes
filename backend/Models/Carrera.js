//Students.js

const { Sequelize, DataTypes } = require("sequelize")

const sequelize = require('../db')

const Carrera = sequelize.define('Carrera', {
    id_carrera:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    description:{
        type:DataTypes.STRING,
        allowNull: false
    },
    duration:{
        type:DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Carrera;