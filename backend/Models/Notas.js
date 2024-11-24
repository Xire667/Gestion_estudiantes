const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../db');
const Student = require('./Student'); // Importar el modelo Estudiante
const Curso = require('./Curso'); // Importar el modelo Curso

const Notas = sequelize.define('Notas', {
    id_nota: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_student: {
        type: DataTypes.INTEGER,
        references: {
            model: Student, // Relación con Student
            key: 'id_student'
        }
    },
    id_curso: {
        type: DataTypes.INTEGER,
        references: {
            model: Curso, // Relación con Curso
            key: 'id_curso'
        }
    },
    nota_1: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nota_2: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nota_3: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    promedio: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

// Relaciones bidireccionales completas
Notas.belongsTo(Student, { 
    foreignKey: 'id_student'
});

Student.hasMany(Notas, {
    foreignKey: 'id_student'
});

Notas.belongsTo(Curso, { 
    foreignKey: 'id_curso'
});

Curso.hasMany(Notas, {
    foreignKey: 'id_curso'
});

module.exports = Notas;
