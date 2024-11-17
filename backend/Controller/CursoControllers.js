//CursoControllers.js

const Curso = require('../Models/Curso')

const CreateCursosController = async ({id_curso, Name, description, credits}) =>{
    try {
        const newCurso = await Curso.create({id_curso, Name, description, credits})
        return newCurso
    } catch (error) {
        throw new Error(error.message)
    }
}

//Get all Cursos
const getAllCursosController = async () =>{
    try {
        const cursos = await Curso.findAll()
        return cursos
    } catch (error) {
        throw new Error(error.message)
    }
}

// Update Curso by ID
const updateCursosByIdController = async(id_curso, cursoData) =>{
    try {
        const updateCurso = await Curso.findByPk(id_curso)
        if(!updateCurso){
            return null
        }
        await updateCurso.update(cursoData)
        return updateCurso
    } catch (error) {
        throw new Error(error.message)
    }
}

//Deleted Curso by ID
const deletedCursosByIdController = async(id_curso) =>{
    try {
        const curso = await Curso.findByPk(id_curso)
        if(!curso){
            return null
        }
        await curso.destroy()
        return curso
    } catch (error){
        throw new Error(error.message)
    }
}

module.exports={
    CreateCursosController,
    getAllCursosController,
    updateCursosByIdController,
    deletedCursosByIdController
}