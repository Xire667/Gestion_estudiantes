//StudentControllers.js

const Student = require('../Models/Student')

const CreateStudentController = async ({id_student, dni, firstName, lastName, email, phone}) =>{
    try {
        const newStudent = await Student.create({id_student, dni,firstName, lastName, email, phone})
        return newStudent
    } catch (error) {
        throw new Error(error.message)
    }
}

//Get all students
const getAllStudentsController = async () =>{
    try {
        const students = await Student.findAll()
        return students
    } catch (error) {
        throw new Error(error.message);
        
    }
}

//Update Student by ID
const updatedStudentsByIdController = async(id_student, studentData) =>{
    try {
        const updateStudent = await Student.findByPk(id_student) //se arreglo esto
        if(!updateStudent){
            return null
        }
        await updateStudent.update(studentData)
        return updateStudent; //se agrego esto
    } catch (error) {
        throw new Error(error.message)
    }
}

//Deleted Student by ID
const deletedStudentsByIdController = async(id_student) =>{
    try {
        const student = await Student.findByPk(id_student)
        if(!student){
            return null
        }
        await student.destroy()
        return student
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports={
    CreateStudentController,
    getAllStudentsController,
    updatedStudentsByIdController,
    deletedStudentsByIdController
}