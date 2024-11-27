// Matricula.js

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../db');
const Student = require('./Student'); // Importar el modelo Estudiante
const Carrera = require('./Carrera'); // Importar el modelo Carrera
const Ciclos = require('./Ciclos')

const Matricula = sequelize.define('Matricula', {
    id_matricula: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_student: {
        type: DataTypes.INTEGER,
        references: {
            model: Student, // Hace referencia al modelo Estudiante
            key: 'id_student' // Llave primaria en Estudiante
        }
    },
    id_carrera: {
        type: DataTypes.INTEGER,
        references: {
            model: Carrera, // Hace referencia al modelo Carrera
            key: 'id_carrera' // Llave primaria en Carrera
        }
    },
    id_ciclo: {
        type: DataTypes.INTEGER,
        references: {
            model: Ciclos, // Hace referencia al modelo Ciclos
            key: 'id_ciclo' // Llave primaria en Ciclos
        }
    }
});

// Establecer la relación de uno a uno entre Estudiante y Matricula
Student.hasOne(Matricula, { foreignKey: 'id_student' }); // Un estudiante tiene una matrícula
Matricula.belongsTo(Student, { foreignKey: 'id_student' }); // Una matrícula pertenece a un estudiante

// Relación entre Matricula y Carrera
Carrera.hasMany(Matricula, { foreignKey: 'id_carrera' }); // Una carrera tiene muchas matrículas
Matricula.belongsTo(Carrera, { foreignKey: 'id_carrera' }); // Una matrícula pertenece a una carrera

// Relación entre Matricula y Ciclo
Ciclos.hasMany(Matricula, { foreignKey: 'id_ciclo' }); // Una carrera tiene muchas matrículas
Matricula.belongsTo(Ciclos, { foreignKey: 'id_ciclo' }); // Una matrícula pertenece a una carrera

module.exports = Matricula;
