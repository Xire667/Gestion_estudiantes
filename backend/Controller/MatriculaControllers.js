//MatriculaControllers.js

const Matricula = require('../Models/Matricula')

const CreateMatriculaController = async ({estado, description, id_student, id_carrera}) => {
    try {
        const newMatricula = await Matricula.create({
            estado,
            description,
            id_student,
            id_carrera
        });
        console.log('Matrícula creada:', newMatricula); // Depurar
        return newMatricula;
    } catch (error) {
        console.error('Error al crear matrícula:', error);
        throw new Error(`Error al crear matrícula: ${error.message}`);
    }
}

//Get all matriculas
const getAllMatriculasController = async () =>{
    try {
        const matriculas = await Matricula.findAll()
        return matriculas
    } catch (error) {
        throw new Error(error.message);
        
    }
}

//Update Matricula by ID
const updatedMatriculasByIdController = async(id_matricula, matriculaData) =>{
    try {
        const updateMatricula = await Matricula.findByPk(id_matricula) //se arreglo esto
        if(!updateMatricula){
            return null
        }
        await updateMatricula.update(matriculaData)
        return updateMatricula; //se agrego esto
    } catch (error) {
        throw new Error(error.message)
    }
}

//Deleted Matricula by ID
const deletedMatriculasByIdController = async(id_matricula) =>{
    try {
        const matricula = await Matricula.findByPk(id_matricula)
        if(!matricula){
            return null
        }
        await matricula.destroy()
        return matricula
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports={
    CreateMatriculaController,
    getAllMatriculasController,
    updatedMatriculasByIdController,
    deletedMatriculasByIdController
}