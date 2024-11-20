import { create } from 'zustand';
import axios from 'axios';

const useStudentStore = create((set) => ({
    students: [],
    addStudent: async (student) => {
        try {
            const response = await axios.post('http://localhost:3001/student', student);
            set((state) => ({
                students: [...state.students, response.data],
            }));
        } catch (error) {
            console.log('Error adding student', error.message);
        }
    },
    fetchStudents: async () => {
        try {
            const response = await axios.get('http://localhost:3001/student');
            set({ students: response.data });
        } catch (error) {
            console.log('Error fetching students', error.message);
        }
    },
    deleteStudent: async (id_student) => {
        try {
            const response = await axios.delete(`http://localhost:3001/student/${id_student}`);
            console.log('Student deleted:', response.data);
            set((state) => ({
                students: state.students.filter((student) => student.id_student !== id_student),
            }));
        } catch (error) {
            console.log('Error deleting student', error.message);
        }
    },
    updateStudent: async (id_student, updatedData) => {
        try {
            const response = await axios.put(`http://localhost:3001/student/${id_student}`, updatedData);
            set((state) => ({
                students: state.students.map((student) =>
                    student.id_student === id_student ? response.data : student
                ),
            }));
        } catch (error) {
            console.log('Error updating student', error.message);
        }
    },
}));

export default useStudentStore;
