import { create } from 'zustand';
import axios from 'axios';

const useNotaStore = create((set) => ({
    notas: [],
    addNota: async (nota) => {
        try {
            const response = await axios.post('http://localhost:3001/notas', nota);
            set((state) => ({
                notas: [...state.notas, response.data],
            }));
            return response.data; // Retornamos la respuesta para manejar el éxito
        } catch (error) {
            console.error('Error adding nota', error.message);
            throw error; // Relanzamos el error para manejarlo en el componente
        }
    },
    fetchNotas: async () => {
        try {
            const response = await axios.get('http://localhost:3001/notas');
            set({ notas: response.data });
            return response.data;
        } catch (error) {
            console.error('Error fetching notas', error.message);
            throw error;
        }
    },
    deleteNota: async (id_nota) => {
        try {
            const response = await axios.delete(`http://localhost:3001/notas/${id_nota}`);
            set((state) => ({
                notas: state.notas.filter((nota) => nota.id_nota !== id_nota),
            }));
            return response.data;
        } catch (error) {
            console.error('Error deleting nota', error.message);
            throw error;
        }
    },
    updateNota: async (id_nota, updatedData) => {
        try {
            const response = await axios.put(`http://localhost:3001/notas/${id_nota}`, updatedData);
            set((state) => ({
                notas: state.notas.map((nota) =>
                    nota.id_nota === id_nota ? response.data : nota
                ),
            }));
            return response.data;
        } catch (error) {
            console.error('Error updating nota', error.message);
            throw error;
        }
    },
}));

export default useNotaStore;