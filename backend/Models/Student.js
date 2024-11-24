const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../db');
const Users = require('./Users');
const Roles = require('./Roles');
const Carrera = require('./Carrera');
const Notas = require('./Notas')

const Student = sequelize.define('Student', {
    id_student: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users, // Nombre del modelo con el que se hace la referencia
            key: 'id_user' // Llave primaria del modelo Users
        }
    },
    id_rol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Roles,
            key: 'id_rol'
        }
    },
    id_carrera: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Carrera, // Nombre del modelo con el que se hace la referencia
            key: 'id_carrera' // Llave primaria del modelo Carrera
        }
    }
});

// Relación: Un usuario puede tener muchos estudiantes
Users.hasMany(Student, { foreignKey: 'id_user' });
// Relación: Un estudiante pertenece a un solo usuario
Student.belongsTo(Users, { foreignKey: 'id_user' });

// Relación: Un rol puede tener muchos estudiantes
Roles.hasMany(Student, { foreignKey: 'id_rol' });
// Relación: Un estudiante pertenece a un solo rol
Student.belongsTo(Roles, { foreignKey: 'id_rol' });

// Relación: Una carrera puede tener muchos estudiantes
Carrera.hasMany(Student, { foreignKey: 'id_carrera' });
// Relación: Un estudiante pertenece a una carrera
Student.belongsTo(Carrera, { foreignKey: 'id_carrera' });

// Relación: Un estudiante tiene muchas notas
Student.hasMany(Notas, { foreignKey: 'id_student' });

module.exports = Student;
