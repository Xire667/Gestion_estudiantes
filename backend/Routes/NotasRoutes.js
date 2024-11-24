//NotaRoutes.js

const {Router} = require('express')
const {CreateNotaController,
    getAllNotasController,
    updatedNotasByIdController,
    deletedNotasByIdController
} = require('../Controller/NotasControllers')

const NotaRouter = Router()

// Crear una nueva Nota (post = agregar informacion)
NotaRouter.post('/', async (req, res) => {
    const { id_student, id_curso, nota_1, nota_2, nota_3, promedio } = req.body;
    if (!id_student || !id_curso || nota_1 === undefined || nota_2 === undefined || nota_3 === undefined || promedio === undefined) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }
    
    try {
        const newNota = await CreateNotaController({ id_student, id_curso, nota_1, nota_2, nota_3, promedio });
        res.status(201).json(newNota);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//Get all notas
NotaRouter.get('/', async (req, res) =>{
    try {
        const notas = await getAllNotasController()
        res.status(200).json(notas)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//Update notas by ID
NotaRouter.put('/:id_nota', async (req, res) => {
    const { id_nota } = req.params
    const notaData = req.body
    try {
        const updatedNotas = await updatedNotasByIdController(id_nota, notaData)
        if(!updatedNotas){
            return res.status(400).json({error: "Nota not found"})
        }
        res.status(200).json(updatedNotas)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//Delete notas by ID
NotaRouter.delete('/:id_nota', async (req, res) =>{
    const { id_nota } = req.params
    try {
        const deteledNota = await deletedNotasByIdController(id_nota)
        if(!deteledNota){
            return res.status(404).json({error: "Notas not found"})
        }
        res.status(200).json({message: "Nota deleted successfully"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports={
    NotaRouter
}