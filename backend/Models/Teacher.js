//Teacher.js

const { Sequelize, DataTypes } = require("sequelize")

const sequelize = require('../db')
const Users= require('./Users')

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
    },
    id_user: {
        type: DataTypes.INTEGER,
        references: {
            model: Users, // Nombre del modelo con el que se hace la referencia
            key: 'id_user' // Llave primaria del modelo Users
        },
        allowNull: false
    },
    id_rol: {
        type: DataTypes.INTEGER,
        references: {
            model: Roles,
            key: 'id_rol'
        },
        allowNull: false
    }
});

// Relación: Un usuario puede tener muchos estudiantes
Users.hasMany(Teacher, { foreignKey: 'id_user' });
// Relación: Un estudiante pertenece a un solo usuario
Student.belongsTo(Users, { foreignKey: 'id_user' });

// Relación: Un rol puede tener muchos estudiantes
Roles.hasMany(Teacher, { foreignKey: 'id_rol' });
// Relación: Un estudiante pertenece a un solo rol
Student.belongsTo(Roles, { foreignKey: 'id_rol' });

module.exports = Teacher;