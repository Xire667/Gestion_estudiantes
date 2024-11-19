import {create} from 'zustand'
import axios from 'axios'

const useCarreraStore = create((set)=>({
    carreras: [],
    addCarrera: async(carrera)=>{
        try {
            const response = await axios.post('http://localhost:3001/carrera', carrera)
            set((state)=>({
                carreras: [...state.carreras, response.data]
            }))
        } catch (error) {
            console.log("Error adding carrera", error.message);
        }
    },
    fetchCarreras: async ()=>{
        try {
            const response = await axios.get('http://localhost:3001/carrera')
            set({carreras: response.data})
        } catch (error) {
            console.log('Error fetching carreras', error.message)
        }
    },
    deleteCarrera: async (id_carrera) =>{
        try {
            const response = await axios.delete(`http://localhost:3001/carrera/${id_carrera}`)
            console.log('Carrera deleted:', response.data)
            set((state) => ({
                carreras: state.carreras.filter((carrera) => carrera.id_carrera !== id_carrera),
            }))
        } catch (error) {
            console.log('Error', error.message)
        }
    },
    updateCarrera: async (id_carrera, updatedData) => {
        try {
            const response = await axios.put(`http://localhost:3001/carrera/${id_carrera}`, updatedData);
            set((state) => ({
                carreras: state.carreras.map((carrera) =>
                    carrera.id_carrera === id_carrera ? response.data : carrera
                ),
            }));
        } catch (error) {
            console.log('Error updating carrera', error.message);
        }
    }
}))

export default useCarreraStore