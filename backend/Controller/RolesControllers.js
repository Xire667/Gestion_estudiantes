//RolesControllers.js

const Roles = require('../Models/Roles')

const CreateRolesController = async ({id_rol, Name, description}) =>{
    try {
        const newRol = await Roles.create({id_rol, Name, description})
        return newRol
    } catch (error) {
        throw new Error(error.message)
    }
}

//Get all Roles
const getAllRolesController = async () =>{
    try {
        const roles = await Roles.findAll()
        return roles
    } catch (error) {
        throw new Error(error.message)
    }
}

// Update Roles by ID
const updatedRolesByIdController = async(id_rol, rolData) =>{
    try {
        const updateRol = await Roles.findByPk(id_rol)
        if(!updateRol){
            return null
        }
        await updateRol.update(rolData)
        return updateRol
    } catch (error) {
        throw new Error(error.message)
    }
}

//Deleted Rol by ID
const deletedRolesByIdController = async(id_rol) =>{
    try {
        const rol = await Roles.findByPk(id_rol)
        if(!rol){
            return null
        }
        await rol.destroy()
        return rol
    } catch (error){
        throw new Error(error.message)
    }
}

module.exports={
    CreateRolesController,
    getAllRolesController,
    updatedRolesByIdController,
    deletedRolesByIdController
}