import { create } from 'zustand';
import axios from 'axios';

const useNotaStore = create((set) => ({
    notas: [],
    addNota: async (nota) => {
        try {
            const response = await axios.post('http://localhost:3001/nota', nota);
            set((state) => ({
                notas: [...state.notas, response.data],
            }));
        } catch (error) {
            console.log('Error adding nota', error.message);
        }
    },
    fetchNotas: async () => {
        try {
            const response = await axios.get('http://localhost:3001/nota');
            set({ notas: response.data });
        } catch (error) {
            console.log('Error fetching notas', error.message);
        }
    },
    deleteNota: async (id_nota) => {
        try {
            const response = await axios.delete(`http://localhost:3001/nota/${id_nota}`);
            console.log('Nota deleted:', response.data);
            set((state) => ({
                notas: state.notas.filter((nota) => nota.id_nota !== id_nota),
            }));
        } catch (error) {
            console.log('Error deleting nota', error.message);
        }
    },
    updateNota: async (id_nota, updatedData) => {
        try {
            const response = await axios.put(`http://localhost:3001/nota/${id_nota}`, updatedData);
            set((state) => ({
                notas: state.notas.map((nota) =>
                    nota.id_nota === id_nota ? response.data : nota
                ),
            }));
        } catch (error) {
            console.log('Error updating nota', error.message);
        }
    },
}));

export default useNotaStore;
