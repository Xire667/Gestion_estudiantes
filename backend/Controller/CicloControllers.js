const Ciclos = require('../Models/Ciclos');

const CreateCicloController = async ({ id_ciclo, ciclo, description }) => {
    try {
        const newCiclo = await Ciclos.create({ id_ciclo, ciclo, description });
        return newCiclo;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Obtener todos los Ciclos
const getAllCiclosController = async () => {
    try {
        const ciclos = await Ciclos.findAll();
        return ciclos;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Actualizar Ciclo por ID
const updatedCiclosByIdController = async (id_ciclo, cicloData) => {
    try {
        const updateCiclo = await Ciclos.findByPk(id_ciclo);
        if (!updateCiclo) {
            return null;
        }
        await updateCiclo.update(cicloData);
        return updateCiclo;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Eliminar Ciclo por ID
const deletedCiclosByIdController = async (id_ciclo) => {
    try {
        const ciclo = await Ciclos.findByPk(id_ciclo);
        if (!ciclo) {
            return null;
        }
        await ciclo.destroy();
        return ciclo;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    CreateCicloController,
    getAllCiclosController,
    updatedCiclosByIdController,
    deletedCiclosByIdController,
};
