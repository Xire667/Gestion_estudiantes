const {Sequelize} = require('../db')

// Modulos

const Student = require('../Models/Student')
const Teacher = require('../Models/Teacher')
const Carrera = require('../Models/Carrera')
const Matricula = require('../Models/Matricula')
const Curso = require('../Models/Curso')
const Roles  = require('../Models/Roles')
const User = require('../Models/Users')
const sequelize = require('../db')

// Exportar modulos

const db = {
    sequelize,
    Student,
    Teacher,
    Carrera,
    Curso,
    Roles,
    User,
    Matricula
}

module.exports = db