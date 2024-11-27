const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../db');
const Users = require('./Users');
const Roles = require('./Roles');
const Carrera = require('./Carrera');
const Ciclo = require('./Ciclos');

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
            model: Users,
            key: 'id_user'
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
            model: Carrera,
            key: 'id_carrera'
        }
    },
    id_ciclo:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:Ciclo,
            key:'id_ciclo'
        }
    }
});

// Relación: Un usuario puede tener muchos estudiantes
Users.hasMany(Student, { foreignKey: 'id_user' });
Student.belongsTo(Users, { foreignKey: 'id_user' });

// Relación: Un rol puede tener muchos estudiantes
Roles.hasMany(Student, { foreignKey: 'id_rol' });
Student.belongsTo(Roles, { foreignKey: 'id_rol' });

// Relación: Una carrera puede tener muchos estudiantes
Carrera.hasMany(Student, { foreignKey: 'id_carrera' });
Student.belongsTo(Carrera, { foreignKey: 'id_carrera' });

// Relación: Un ciclo puede tener muchos estudiantes
Ciclo.hasMany(Student, { foreignKey: 'id_ciclo' });
Student.belongsTo(Ciclo, { foreignKey: 'id_ciclo' });

module.exports = Student;
