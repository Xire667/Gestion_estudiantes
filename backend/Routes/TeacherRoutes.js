//TeacherRoutes.js

const {Router} = require('express')
const {CreateTeacherController,
    getAllTeachersController,
    updatedTeachersByIdController,
    deletedTeachersByIdController
} = require('../Controller/TeacherControllers')

const TeacherRouter = Router()

//Crear un nuevo Teachers (post = agregar informacion)
TeacherRouter.post('/',async(req, res)=>{
    const {id_teacher, dni, firstName, lastName, email, phone} = req.body
    try{
        const newTeacher = await CreateTeacherController({id_teacher, dni, firstName, lastName, email, phone})
        res.status(201).json(newTeacher)
    }catch (error){
        res.status(400).json({error: error.message})
    }
})

//Get all teachers
TeacherRouter.get('/', async (req, res) =>{
    try {
        const teachers = await getAllTeachersController()
        res.status(200).json(teachers)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//Update teachers by ID
TeacherRouter.put('/:id_teacher', async (req, res) => {
    const { id_teacher } = req.params
    const teacherData = req.body
    try {
        const updatedTeachers = await updatedTeachersByIdController(id_teacher, teacherData)
        if(!updatedTeachers){
            return res.status(400).json({error: "Teacher not found"})
        }
        res.status(200).json(updatedTeachers)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//Delete teachers by ID
TeacherRouter.delete('/:id_teacher', async (req, res) =>{
    const { id_teacher } = req.params
    try {
        const deteledTeacher = await deletedTeachersByIdController(id_teacher)
        if(!deteledTeacher){
            return res.status(404).json({error: "Teacher not found"})
        }
        res.status(200).json({message: "Teacher deleted successfully"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports={
    TeacherRouter
}