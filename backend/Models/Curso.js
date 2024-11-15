// Curso.js

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require('../db');
const Carrera = require('./Carrera'); // Importar el modelo Carrera

const Curso = sequelize.define('Curso', { // El modelo debe llamarse 'Curso'
    id_curso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_carrera: {
        type: DataTypes.INTEGER,
        references: {
            model: Carrera, // Nombre del modelo con el que se hace la referencia
            key: 'id_carrera' // Llave primaria del modelo Carrera
        }
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false
    },
    creditos:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Definir la relación entre Curso y Carrera
Carrera.hasMany(Curso, { foreignKey: 'id_carrera' });
Curso.belongsTo(Carrera, { foreignKey: 'id_carrera' });

module.exports = Curso;
