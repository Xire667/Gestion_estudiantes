//MatriculaRoutes.js

const { Router } = require('express');
const {
    CreateMatriculaController,
    getAllMatriculasController,
    updatedMatriculasByIdController,
    deletedMatriculasByIdController
} = require('../Controller/MatriculaControllers');

const MatriculaRouter = Router();

// Crear un nuevo Matricula (post = agregar información)
MatriculaRouter.post('/', async (req, res) => {
    const { estado, description, id_student, id_carrera, id_ciclo } = req.body;
    try {
        const newMatricula = await CreateMatriculaController({ estado, description, id_student, id_carrera, id_ciclo });
        res.status(201).json(newMatricula);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener todos los matriculas
MatriculaRouter.get('/', async (req, res) => {
    try {
        const matriculas = await getAllMatriculasController();
        res.status(200).json(matriculas);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Actualizar matricula por ID
MatriculaRouter.put('/:id_matricula', async (req, res) => {
    const { id_matricula } = req.params;
    const matriculaData = req.body;
    try {
        const updatedMatriculas = await updatedMatriculasByIdController(id_matricula, matriculaData);
        if (!updatedMatriculas) {
            return res.status(400).json({ error: "Matricula not found" });
        }
        res.status(200).json(updatedMatriculas);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar matricula por ID
MatriculaRouter.delete('/:id_matricula', async (req, res) => {
    const { id_matricula } = req.params;
    try {
        const deteledMatricula = await deletedMatriculasByIdController(id_matricula);
        if (!deteledMatricula) {
            return res.status(404).json({ error: "Matricula not found" });
        }
        res.status(200).json({ message: "Matricula deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = {
    MatriculaRouter
};
