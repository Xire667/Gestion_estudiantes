//RolesRoutes.js

const {Router} = require('express')
const {CreateRolesController,
    getAllRolesController,
    updatedRolesByIdController,
    deletedRolesByIdController
} = require('../Controller/RolesControllers')

const RolRouter = Router()

//Crear una nueva Rol (post = agregar informacion)
RolRouter.post('/',async(req, res)=>{
    const {id_rol, Name, description} = req.body
    try{
        const newRol = await CreateRolesController({id_rol, Name, description})
        res.status(201).json(newRol)
    }catch (error){
        res.status(400).json({error: error.message})
    }
})

//Get all roles
RolRouter.get('/', async (req, res) =>{
    try {
        const roles = await getAllRolesController()
        res.status(200).json(roles)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//Update roles by ID
RolRouter.put('/:id_rol', async (req, res) => {
    const { id_rol } = req.params
    const rolData = req.body
    try {
        const updatedRoles = await updatedRolesByIdController(id_rol, rolData)
        if(!updatedRoles){
            return res.status(400).json({error: "Rol not found"})
        }
        res.status(200).json(updatedRoles)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//Delete roles by ID
RolRouter.delete('/:id_rol', async (req, res) =>{
    const { id_rol } = req.params
    try {
        const deteledRol = await deletedRolesByIdController(id_rol)
        if(!deteledRol){
            return res.status(404).json({error: "Rol not found"})
        }
        res.status(200).json({message: "Rol deleted successfully"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports={
    RolRouter
}