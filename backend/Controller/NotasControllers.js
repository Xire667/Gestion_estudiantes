//NotaControllers.js

const Notas = require('../Models/Notas')

const CreateNotaController = async ({id_student, id_curso, nota_1, nota_2, nota_3, promedio}) => {
    try {
        // Crear el nuevo estudiante con todos los campos necesarios
        const newNota = await Notas.create({
            id_student,
            id_curso, // ID del curso relacionado
            nota_1,
            nota_2,
            nota_3,
            promedio
        });
        return newNota;
    } catch (error) {
        throw new Error(error.message);
    }
}

//Get all notas
const getAllNotasController = async () =>{
    try {
        const notas = await Notas.findAll()
        return notas
    } catch (error) {
        throw new Error(error.message);
        
    }
}

//Update Nota by ID
const updatedNotasByIdController = async(id_nota, notaData) =>{
    try {
        const updateNota = await Notas.findByPk(id_nota) //se arreglo esto
        if(!updateNota){
            return null
        }
        await updateNota.update(notaData)
        return updateNota; //se agrego esto
    } catch (error) {
        throw new Error(error.message)
    }
}

//Deleted Nota by ID
const deletedNotasByIdController = async(id_nota) =>{
    try {
        const nota = await Notas.findByPk(id_nota)
        if(!nota){
            return null
        }
        await nota.destroy()
        return nota
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports={
    CreateNotaController,
    getAllNotasController,
    updatedNotasByIdController,
    deletedNotasByIdController
}