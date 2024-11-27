const { Router } = require('express');
const {
    CreateCicloController,
    getAllCiclosController,
    updatedCiclosByIdController,
    deletedCiclosByIdController
} = require('../Controller/CicloControllers');

const CicloRouter = Router();

// Crear un nuevo Ciclo (post = agregar información)
CicloRouter.post('/', async (req, res) => {
    const { id_ciclo, ciclo, description  } = req.body;
    try {
        const newCiclo = await CreateCicloController({ id_ciclo, ciclo, description });
        res.status(201).json(newCiclo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener todos los ciclos
CicloRouter.get('/', async (req, res) => {
    try {
        const ciclos = await getAllCiclosController();
        res.status(200).json(ciclos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Actualizar ciclo por ID
CicloRouter.put('/:id_ciclo', async (req, res) => {
    const { id_ciclo } = req.params;
    const cicloData = req.body;
    try {
        const updatedCiclos = await updatedCiclosByIdController(id_ciclo, cicloData);
        if (!updatedCiclos) {
            return res.status(400).json({ error: "Ciclo not found" });
        }
        res.status(200).json(updatedCiclos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar ciclo por ID
CicloRouter.delete('/:id_ciclo', async (req, res) => {
    const { id_ciclo } = req.params;
    try {
        const deteledCiclo = await deletedCiclosByIdController(id_ciclo);
        if (!deteledCiclo) {
            return res.status(404).json({ error: "Ciclo not found" });
        }
        res.status(200).json({ message: "Ciclo deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = {
    CicloRouter
};
