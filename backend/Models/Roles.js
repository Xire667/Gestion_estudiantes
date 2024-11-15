//Roles.js

const { Sequelize, DataTypes } = require("sequelize")

const sequelize = require('../db')

const Roles = sequelize.define('Roles', {
    id_rol:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull: false
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Roles;