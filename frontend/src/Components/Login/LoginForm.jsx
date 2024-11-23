import style from './LoginForm.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Asegúrate de instalar axios: npm install axios

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: '', // Cambié 'user' a 'userName' para que coincida con tu backend
        password: ''
    });
    const [error, setError] = useState(''); // Estado para manejar errores de login

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar errores anteriores
        
        try {
            // Hacer la solicitud de login
            const response = await axios.post('http://localhost:3001/user/login', formData);
            
            // Guardar el token o información del usuario en el localStorage si es necesario
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            // Navegar a la página de inicio después del login exitoso
            navigate('/home');
        } catch (error) {
            // Manejar errores de login
            setError(error.response?.data?.error || 'Error de inicio de sesión');
            console.error('Error de login:', error);
        }
    };

    const handleNavigate = async (e) =>{
        e.preventDefault();
        navigate('/register');
    }

    return (
        <div className={style.contenedorGeneral}>
            <div className={style.contenedorLogin}>
                <h2 className={style.titulo}>Login</h2>
                {error && <p style={{color: 'red'}}>{error}</p>} {/* Mostrar mensaje de error */}
                <form className={style.formulario} onSubmit={handleSubmit}>
                    <label className={style.etiqueta}>
                        User:
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            className={style.input}
                            required
                        />
                    </label>
                    <label className={style.etiqueta}>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={style.input}
                            required
                        />
                    </label>
                    <div className={style.botones}>
                        <button type="submit" className={style.boton}>Iniciar Sesión</button>
                        <button type="button" className={style.botonSecundario} onClick={handleNavigate} >Registrarse</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;