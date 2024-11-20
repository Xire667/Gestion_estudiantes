//StudentRoutes.js

const {Router} = require('express')
const {CreateStudentController,
    getAllStudentsController,
    updatedStudentsByIdController,
    deletedStudentsByIdController
} = require('../Controller/StudentControllers')

const StudentRouter = Router()

//Crear una nueva Student (post = agregar informacion)
StudentRouter.post('/',async(req, res)=>{
    const {id_student, dni, firstName, lastName, email, phone} = req.body
    try{
        const newStudent = await CreateStudentController({id_student, dni, firstName, lastName, email, phone})
        res.status(201).json(newStudent)
    }catch (error){
        res.status(400).json({error: error.message})
    }
})

//Get all students
StudentRouter.get('/', async (req, res) =>{
    try {
        const students = await getAllStudentsController()
        res.status(200).json(students)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//Update students by ID
StudentRouter.put('/:id_student', async (req, res) => {
    const { id_student } = req.params
    const studentData = req.body
    try {
        const updatedStudents = await updatedStudentsByIdController(id_student, studentData)
        if(!updatedStudents){
            return res.status(400).json({error: "Student not found"})
        }
        res.status(200).json(updatedStudents)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//Delete students by ID
StudentRouter.delete('/:id_students', async (req, res) =>{
    const { id_students } = req.params
    try {
        const deteledStudent = await deletedStudentsByIdController(id_students)
        if(!deteledStudent){
            return res.status(404).json({error: "Students not found"})
        }
        res.status(200).json({message: "Student deleted successfully"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports={
    StudentRouter
}