import { create } from 'zustand';
import axios from 'axios';

const useMatriculaStore = create((set) => ({
    matriculas: [],
    addMatricula: async (matricula) => {
        try {
            const response = await axios.post('http://localhost:3001/matricula', matricula);
            console.log('Matrícula creada:', response.data);
            set((state) => ({
                matriculas: [...state.matriculas, response.data],
            }));
            return response.data;  // Devuelve los datos de la respuesta
        } catch (error) {
            console.error('Error adding matricula', error.message);
            throw new Error('Error al crear matrícula: ' + error.message);  // Lanza el error para que sea capturado en el formulario
        }
    },
    fetchMatriculas: async () => {
        try {
            const response = await axios.get('http://localhost:3001/matricula');
            set({ matriculas: response.data });
        } catch (error) {
            console.log('Error fetching matriculas', error.message);
        }
    },
    deleteMatricula: async (id_matricula) => {
        try {
            const response = await axios.delete(`http://localhost:3001/matricula/${id_matricula}`);
            console.log('Matricula deleted:', response.data);
            set((state) => ({
                matriculas: state.matriculas.filter((matricula) => matricula.id_matricula !== id_matricula),
            }));
        } catch (error) {
            console.log('Error deleting matricula', error.message);
        }
    },
    updateMatricula: async (id_matricula, updatedData) => {
        try {
            const response = await axios.put(`http://localhost:3001/matricula/${id_matricula}`, updatedData);
            set((state) => ({
                matriculas: state.matriculas.map((matricula) =>
                    matricula.id_matricula === id_matricula ? response.data : matricula
                ),
            }));
        } catch (error) {
            console.log('Error updating matricula', error.message);
        }
    },
}));

export default useMatriculaStore;
