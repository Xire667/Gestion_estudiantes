//NotaControllers.js

const Notas = require('../Models/Notas')

const CreateNotaController = async ({ id_student, id_curso, nota_1, nota_2, nota_3, promedio }) => {
    try {
        // Verificar que todos los campos estén presentes
        if (!id_student || !id_curso || !nota_1 || !nota_2 || !nota_3 || !promedio) {
            throw new Error("All fields are required");
        }

        // Verificar que las notas sean números válidos
        if (isNaN(nota_1) || isNaN(nota_2) || isNaN(nota_3) || isNaN(promedio)) {
            throw new Error("All nota values must be valid numbers");
        }

        // Crear el nuevo registro de nota
        const newNota = await Notas.create({
            id_student,
            id_curso,
            nota_1: parseFloat(nota_1),
            nota_2: parseFloat(nota_2),
            nota_3: parseFloat(nota_3),
            promedio: parseFloat(promedio)
        });

        return newNota;
    } catch (error) {
        console.error("Error in CreateNotaController:", error.message);
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