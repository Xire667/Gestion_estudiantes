// Ciclos.js

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require('../db');

const Ciclo = sequelize.define('Ciclo', {
    id_ciclo: {
        type: DataTypes.INTEGER,
        primaryKey: true,   
        autoIncrement: true
    },
    ciclo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Ciclo;
