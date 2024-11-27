// Curso.js

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require('../db');
const Carrera = require('./Carrera'); // Importar el modelo Carrera
const Ciclo = require('./Ciclos')

const Curso = sequelize.define('Curso', { // El modelo debe llamarse 'Curso'
    id_curso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    credits:{
        type: DataTypes.STRING,
        allowNull: false
    },
    id_carrera: {
        type: DataTypes.INTEGER,
        references: {
            model: Carrera, // Nombre del modelo con el que se hace la referencia
            key: 'id_carrera' // Llave primaria del modelo Carrera
        }
    },
    id_ciclo:{
        type: DataTypes.INTEGER,
        references: {
            model: Ciclo,
            key: 'id_ciclo'
        }
    }
});

// Definir la relación entre Curso y Carrera
Carrera.hasMany(Curso, { foreignKey: 'id_carrera' });
Curso.belongsTo(Carrera, { foreignKey: 'id_carrera' });


// Definir la relación entre Curso y Ciclo
Ciclo.hasMany(Curso, { foreignKey: 'id_ciclo' });
Curso.belongsTo(Ciclo, { foreignKey: 'id_ciclo' });

module.exports = Curso;
