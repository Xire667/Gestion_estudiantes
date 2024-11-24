const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../db');
const Users = require('./Users');
const Roles = require('./Roles');
const Carrera = require('./Carrera');

const Teacher = sequelize.define('Teacher', {
    id_teacher: {
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
    }
});

// Relación: Un usuario puede tener muchos estudiantes
Users.hasMany(Teacher, { foreignKey: 'id_user' });
// Relación: Un estudiante pertenece a un solo usuario
Teacher.belongsTo(Users, { foreignKey: 'id_user' });

// Relación: Un rol puede tener muchos estudiantes
Roles.hasMany(Teacher, { foreignKey: 'id_rol' });
// Relación: Un estudiante pertenece a un solo rol
Teacher.belongsTo(Roles, { foreignKey: 'id_rol' });

// Relación: Una carrera puede tener muchos estudiantes
Carrera.hasMany(Teacher, { foreignKey: 'id_carrera' });
// Relación: Un estudiante pertenece a una carrera
Teacher.belongsTo(Carrera, { foreignKey: 'id_carrera' });

module.exports = Teacher;
