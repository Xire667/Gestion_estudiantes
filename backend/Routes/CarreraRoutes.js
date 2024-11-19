//CarreraRoutes.js

const {Router} = require('express')
const {CreateCarreraController,
    getAllCarrerasController,
    updatedCarrerasByIdController,
    deletedCarrerasByIdController
} = require('../Controller/CarreraControllers')

const CarreraRouter = Router()

//Crear una nueva Carrera (post = agregar informacion)
CarreraRouter.post('/',async(req, res)=>{
    const {id_carrera, Name, description, duration} = req.body
    try{
        const newCarrera = await CreateCarreraController({id_carrera, Name, description, duration})
        res.status(201).json(newCarrera)
    }catch (error){
        res.status(400).json({error: error.message})
    }
})

//Get all carreras
CarreraRouter.get('/', async (req, res) =>{
    try {
        const carreras = await getAllCarrerasController()
        res.status(200).json(carreras)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//Update carreras by ID
CarreraRouter.put('/:id_carrera', async (req, res) => {
    const { id_carrera } = req.params
    const carreraData = req.body
    try {
        const updatedCarreras = await updatedCarrerasByIdController(id_carrera, carreraData)
        if(!updatedCarreras){
            return res.status(400).json({error: "Carrera not found"})
        }
        res.status(200).json(updatedCarreras)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//Delete students by ID
CarreraRouter.delete('/:id_carrera', async (req, res) =>{
    const { id_carrera } = req.params
    try {
        const deteledCarrera = await deletedCarrerasByIdController(id_carrera)
        if(!deteledCarrera){
            return res.status(404).json({error: "Carrera not found"})
        }
        res.status(200).json({message: "Carrera deleted successfully"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports={
    CarreraRouter
}