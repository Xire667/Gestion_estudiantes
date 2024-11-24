import { create } from 'zustand';
import axios from 'axios';

const useTeachersStore = create((set) => ({
    teachers: [],
    addTeacher: async (teacher) => {
        try {
            const response = await axios.post('http://localhost:3001/teacher', teacher);
            set((state) => ({
                teachers: [...state.teachers, response.data],
            }));
        } catch (error) {
            console.log('Error adding teacher', error.message);
        }
    },
    fetchTeachers: async () => {
        try {
            const response = await axios.get('http://localhost:3001/teacher');
            set({ teachers: response.data });
        } catch (error) {
            console.log('Error fetching teachers', error.message);
        }
    },
    deleteTeacher: async (id_teacher) => {
        try {
            const response = await axios.delete(`http://localhost:3001/teacher/${id_teacher}`);
            console.log('Teacher deleted:', response.data);
            set((state) => ({
                teachers: state.teachers.filter((teacher) => teacher.id_teacher !== id_teacher),
            }));
        } catch (error) {
            console.log('Error deleting teacher', error.message);
        }
    },
    updateTeacher: async (id_teacher, updatedData) => {
        try {
            const response = await axios.put(`http://localhost:3001/teacher/${id_teacher}`, updatedData);
            set((state) => ({
                teachers: state.teachers.map((teacher) =>
                    teacher.id_teacher === id_teacher ? response.data : teacher
                ),
            }));
        } catch (error) {
            console.log('Error updating teacher', error.message);
        }
    },
}));

export default useTeachersStore;
