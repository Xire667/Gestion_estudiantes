import { create } from 'zustand';
import axios from 'axios';

const useUserStore = create((set) => ({
    users: [],
    addUser: async (user) => {
        try {
            const response = await axios.post('http://localhost:3001/user', user);
            // Devolver la respuesta completa
            return response.data;
        } catch (error) {
            console.log('Error adding user', error.message);
            throw error; // Propagar el error
        }
    },
    fetchUsers: async () => {
        try {
            const response = await axios.get('http://localhost:3001/user');
            set({ users: response.data });
        } catch (error) {
            console.log('Error fetching users', error.message);
        }
    },
    deleteUser: async (id_user) => {
        try {
            const response = await axios.delete(`http://localhost:3001/user/${id_user}`);
            console.log('User deleted:', response.data);
            set((state) => ({
                users: state.users.filter((user) => user.id_user !== id_user),
            }));
        } catch (error) {
            console.log('Error deleting user', error.message);
        }
    },
    updateUser: async (id_user, updatedData) => {
        try {
            const response = await axios.put(`http://localhost:3001/user/${id_user}`, updatedData);
            set((state) => ({
                users: state.users.map((user) =>
                    user.id_user === id_user ? response.data : user
                ),
            }));
        } catch (error) {
            console.log('Error updating user', error.message);
        }
    },
}));

export default useUserStore;
