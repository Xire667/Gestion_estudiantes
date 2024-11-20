import { create } from 'zustand';
import axios from 'axios';

const useRolesStore = create((set) => ({
    roles: [],
    addRole: async (role) => {
        try {
            const response = await axios.post('http://localhost:3001/rol', role);
            set((state) => ({
                roles: [...state.roles, response.data],
            }));
        } catch (error) {
            console.log('Error adding role', error.message);
        }
    },
    fetchRoles: async () => {
        try {
            const response = await axios.get('http://localhost:3001/rol');
            set({ roles: response.data });
        } catch (error) {
            console.log('Error fetching roles', error.message);
        }
    },
    deleteRole: async (id_rol) => {
        try {
            const response = await axios.delete(`http://localhost:3001/rol/${id_rol}`);
            console.log('Role deleted:', response.data);
            set((state) => ({
                roles: state.roles.filter((role) => role.id_rol !== id_rol),
            }));
        } catch (error) {
            console.log('Error deleting role', error.message);
        }
    },
    updateRole: async (id_rol, updatedData) => {
        try {
            const response = await axios.put(`http://localhost:3001/rol/${id_rol}`, updatedData);
            set((state) => ({
                roles: state.roles.map((role) =>
                    role.id_rol === id_rol ? response.data : role
                ),
            }));
        } catch (error) {
            console.log('Error updating role', error.message);
        }
    },
}));

export default useRolesStore;
