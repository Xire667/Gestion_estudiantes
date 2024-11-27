import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set, get) => ({
    user: null,
    token: null,
    roles: {},

    updateRoleRoutes: (roleRoutes) => {
        set({ roles: roleRoutes });
    },

    getRouteByRole: (role) => {
        const defaultRoutes = {
            'Administrador': '/admin-dashboard',
            'Estudiante': '/student_list',
            'Profesor': '/teacher_list'
        };
        const store = get();
        return store.roles[role] || defaultRoutes[role] || '/home';
    },

    login: async (userName, password) => {
        try {
            const response = await axios.post('http://localhost:3001/users', { userName, password });
            const { token, user } = response.data;

            if (!token || !user) throw new Error('Datos de usuario no válidos');

            // Configurar el token en los headers de axios
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            set({ user, token });
            return user;
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            throw new Error(error.response?.data?.error || 'Error al iniciar sesión');
        }
    },

    logout: () => {
        set({ user: null, token: null });
        delete axios.defaults.headers.common['Authorization'];
    }
}));

export default useAuthStore;