const { Router } = require('express');
const {
    CreateCursoController,
    getAllCursosController,
    updatedCursosByIdController,
    deletedCursosByIdController
} = require('../Controller/CursoControllers');

const CursoRouter = Router();

// Crear un nuevo Curso (post = agregar información)
CursoRouter.post('/', async (req, res) => {
    const { id_curso, Name, description, credits, id_carrera, id_ciclo } = req.body;
    try {
        const newCurso = await CreateCursoController({ id_curso, Name, description, credits, id_carrera, id_ciclo});
        res.status(201).json(newCurso);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener todos los cursos
CursoRouter.get('/', async (req, res) => {
    try {
        const cursos = await getAllCursosController();
        res.status(200).json(cursos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Actualizar curso por ID
CursoRouter.put('/:id_curso', async (req, res) => {
    const { id_curso } = req.params;
    const cursoData = req.body;
    try {
        const updatedCursos = await updatedCursosByIdController(id_curso, cursoData);
        if (!updatedCursos) {
            return res.status(400).json({ error: "Curso not found" });
        }
        res.status(200).json(updatedCursos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar curso por ID
CursoRouter.delete('/:id_curso', async (req, res) => {
    const { id_curso } = req.params;
    try {
        const deteledCurso = await deletedCursosByIdController(id_curso);
        if (!deteledCurso) {
            return res.status(404).json({ error: "Curso not found" });
        }
        res.status(200).json({ message: "Curso deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = {
    CursoRouter
};
