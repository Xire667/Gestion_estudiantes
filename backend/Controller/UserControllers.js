//UserControllers.js

const User = require('../Models/Users')
const bcrypt = require('bcrypt')

const CreateUserController = async ({id_user, userName, password}) =>{

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const newUser = await User.create({id_user, userName, password:hashedPassword})
        return newUser
    } catch (error) {
        throw new Error(error.message)
    }
}

// Nuevo método de login
const loginUserController = async (userName, password) => {
    try {
        // Buscar el usuario por nombre de usuario
        const user = await User.findOne({ 
            where: { userName } 
        });
        
        // Si no se encuentra el usuario
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        
        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        
        // Si la contraseña no coincide
        if (!isMatch) {
            throw new Error('Contraseña incorrecta');
        }
        
        // Si todo es correcto, devolver el usuario
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

//Get all students
const getAllUsersController = async () =>{
    try {
        const users = await User.findAll()
        return users
    } catch (error) {
        throw new Error(error.message);
        
    }
}

//Update Student by ID
const updatedUsersByIdController = async(id_user, userData) =>{
    try {
        const updateUser = await User.findByPk(id_user) //se arreglo esto
        if(!updateUser){
            return null
        }
        await updateUser.update(userData)
        return updateUser; //se agrego esto
    } catch (error) {
        throw new Error(error.message)
    }
}

//Deleted Student by ID
const deletedUsersByIdController = async(id_user) =>{
    try {
        const user = await User.findByPk(id_user)
        if(!user){
            return null
        }
        await user.destroy()
        return user
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports={
    CreateUserController,
    getAllUsersController,
    updatedUsersByIdController,
    deletedUsersByIdController,
    loginUserController
}