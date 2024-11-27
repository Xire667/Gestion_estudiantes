import {create} from 'zustand'
import axios from 'axios'

const useCicloStore = create((set)=>({
    ciclos: [],
    addCiclos: async(ciclo)=>{
        try {
            const response = await axios.post('http://localhost:3001/ciclos', ciclo)
            set((state)=>({
                ciclos: [...state.ciclos, response.data]
            }))
        } catch (error) {
            console.log("Error adding ciclos", error.message);
        }
    },
    fetchCiclos: async ()=>{
        try {
            const response = await axios.get('http://localhost:3001/ciclos')
            set({ciclos: response.data})
        } catch (error) {
            console.log('Error fetching ciclos', error.message)
        }
    },
    deleteCiclo: async (id_ciclo) =>{
        try {
            const response = await axios.delete(`http://localhost:3001/ciclos/${id_ciclo}`)
            console.log('Ciclo deleted:', response.data)
            set((state) => ({
                ciclos: state.ciclos.filter((ciclo) => ciclo.id_ciclo !== id_ciclo),
            }))
        } catch (error) {
            console.log('Error', error.message)
        }
    },
    updateCiclo: async (id_ciclo, updatedData) => {
        try {
            const response = await axios.put(`http://localhost:3001/ciclos/${id_ciclo}`, updatedData);
            set((state) => ({
                ciclos: state.ciclos.map((ciclo) =>
                    ciclo.id_ciclo === id_ciclo ? response.data : ciclo
                ),
            }));
        } catch (error) {
            console.log('Error updating ciclo', error.message);
        }
    }
}))

export default useCicloStore