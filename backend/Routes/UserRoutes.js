//UserRoutes.js

const {Router} = require('express')
const {CreateUserController,
    getAllUsersController,
    updatedUsersByIdController,
    deletedUsersByIdController,
    loginUserController
} = require('../Controller/UserControllers')

const UserRouter = Router()

// Ruta de login que ya tenías
UserRouter.post('/login', async (req, res) => {
    const { userName, password } = req.body;
    try {
        const user = await loginUserController(userName, password);
        res.status(200).json({ 
            message: 'Inicio de sesión exitoso', 
            user: {
                id_user: user.id_user,
                userName: user.userName
            }
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
})

//Crear un nuevo Users (post = agregar informacion)
UserRouter.post('/',async(req, res)=>{
    const {id_user, userName, password} = req.body
    try{
        const newUser = await CreateUserController({id_user, userName, password})
        res.status(201).json(newUser)
    }catch (error){
        res.status(400).json({error: error.message})
    }
})

//Get all Users
UserRouter.get('/', async (req, res) =>{
    try {
        const users = await getAllUsersController()
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//Update users by ID
UserRouter.put('/:id_user', async (req, res) => {
    const { id_user } = req.params
    const userData = req.body
    try {
        const updatedUsers = await updatedUsersByIdController(id_user, userData)
        if(!updatedUsers){
            return res.status(400).json({error: "User not found"})
        }
        res.status(200).json(updatedUsers)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//Delete users by ID
UserRouter.delete('/:id_user', async (req, res) =>{
    const { id_user } = req.params
    try {
        const deteledUser = await deletedUsersByIdController(id_user)
        if(!deteledUser){
            return res.status(404).json({error: "User not found"})
        }
        res.status(200).json({message: "User deleted successfully"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports={
    UserRouter
}