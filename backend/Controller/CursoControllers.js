const Curso = require('../Models/Curso');

const CreateCursoController = async ({ id_curso, Name, description, credits, id_carrera, id_ciclo}) => {
    try {
        const newCurso = await Curso.create({ id_curso, Name, description, credits, id_carrera, id_ciclo });
        return newCurso;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Obtener todos los Cursos
const getAllCursosController = async () => {
    try {
        const cursos = await Curso.findAll();
        return cursos;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Actualizar Curso por ID
const updatedCursosByIdController = async (id_curso, cursoData) => {
    try {
        const updateCurso = await Curso.findByPk(id_curso);
        if (!updateCurso) {
            return null;
        }
        await updateCurso.update(cursoData);
        return updateCurso;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Eliminar Curso por ID
const deletedCursosByIdController = async (id_curso) => {
    try {
        const curso = await Curso.findByPk(id_curso);
        if (!curso) {
            return null;
        }
        await curso.destroy();
        return curso;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    CreateCursoController,
    getAllCursosController,
    updatedCursosByIdController,
    deletedCursosByIdController,
};
