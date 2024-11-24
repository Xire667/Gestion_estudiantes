//TeacherControllers.js

const Teacher = require('../Models/Teacher')

const CreateTeacherController = async ({dni, firstName, lastName, email, phone, id_user, id_rol, id_carrera}) =>{
    try {
        const newTeacher = await Teacher.create({
            dni, 
            firstName, 
            lastName, 
            email, 
            phone,
            id_user,
            id_rol,
            id_carrera
        })
        return newTeacher
    } catch (error) {
        throw new Error(error.message)
    }
}

//Get all teachers
const getAllTeachersController = async () =>{
    try {
        const teachers = await Teacher.findAll()
        return teachers
    } catch (error) {
        throw new Error(error.message);
        
    }
}

//Update Teachers by ID
const updatedTeachersByIdController = async(id_teacher, teacherData) =>{
    try {
        const updateTeacher = await Teacher.findByPk(id_teacher) //se arreglo esto
        if(!updateTeacher){
            return null
        }
        await updateTeacher.update(teacherData)
        return updateTeacher; //se agrego esto
    } catch (error) {
        throw new Error(error.message)
    }
}

//Deleted Teacher by ID
const deletedTeachersByIdController = async(id_teacher) =>{
    try {
        const teacher = await Teacher.findByPk(id_teacher)
        if(!teacher){
            return null
        }
        await teacher.destroy()
        return teacher
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports={
    CreateTeacherController,
    getAllTeachersController,
    updatedTeachersByIdController,
    deletedTeachersByIdController
}