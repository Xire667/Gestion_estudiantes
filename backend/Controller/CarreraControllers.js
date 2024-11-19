//CarreraControllers.js

const Carrera = require('../Models/Carrera')

const CreateCarreraController = async ({id_carrera, Name, description, duration}) =>{
    try {
        const newCarrera = await Carrera.create({id_carrera, Name, description, duration})
        return newCarrera
    } catch (error) {
        throw new Error(error.message)
    }
}

//Get all Carreras
const getAllCarrerasController = async () =>{
    try {
        const carreras = await Carrera.findAll()
        return carreras
    } catch (error) {
        throw new Error(error.message)
    }
}

// Update Carrera by ID
const updatedCarrerasByIdController = async(id_carrera, carreraData) =>{
    try {
        const updateCarrera = await Carrera.findByPk(id_carrera)
        if(!updateCarrera){
            return null
        }
        await updateCarrera.update(carreraData)
        return updateCarrera
    } catch (error) {
        throw new Error(error.message)
    }
}

//Deleted Carrera by ID
const deletedCarrerasByIdController = async(id_carrera) =>{
    try {
        const carrera = await Carrera.findByPk(id_carrera)
        if(!carrera){
            return null
        }
        await carrera.destroy()
        return carrera
    } catch (error){
        throw new Error(error.message)
    }
}

module.exports={
    CreateCarreraController,
    getAllCarrerasController,
    updatedCarrerasByIdController,
    deletedCarrerasByIdController
}