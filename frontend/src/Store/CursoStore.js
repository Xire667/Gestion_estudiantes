import {create} from 'zustand'
import axios from 'axios'

const useCursoStore = create((set)=>({
    cursos: [],
    addCursos: async(curso)=>{
        try {
            const response = await axios.post('http://localhost:3001/curso', curso)
            set((state)=>({
                cursos: [...state.cursos, response.data]
            }))
        } catch (error) {
            console.log("Error adding cursos", error.message);
        }
    },
    fetchCursos: async ()=>{
        try {
            const response = await axios.get('http://localhost:3001/curso')
            set({cursos: response.data})
        } catch (error) {
            console.log('Error fetching cursos', error.message)
        }
    },
    deleteCurso: async (id_curso) =>{
        try {
            const response = await axios.delete(`http://localhost:3001/curso/${id_curso}`)
            console.log('Curso deleted:', response.data)
            set((state) => ({
                cursos: state.cursos.filter((curso) => curso.id_curso !== id_curso),
            }))
        } catch (error) {
            console.log('Error', error.message)
        }
    },
    updateCurso: async (id_curso, updatedData) => {
        try {
            const response = await axios.put(`http://localhost:3001/curso/${id_curso}`, updatedData);
            set((state) => ({
                cursos: state.cursos.map((curso) =>
                    curso.id_curso === id_curso ? response.data : curso
                ),
            }));
        } catch (error) {
            console.log('Error updating curso', error.message);
        }
    }
}))

export default useCursoStore