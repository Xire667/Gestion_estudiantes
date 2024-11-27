import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from './LoginForm.module.css';
import logo from '../img/suiza.png';

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:3001/user/login', formData);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/home');
        } catch (error) {
            setError(error.response?.data?.error || 'Error de inicio de sesión');
            console.error('Error de login:', error);
        }
    };
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={style.contenedorGeneral}>
            <div className={style.contenedorLogin}>
                <div className={style.logoContainer}>
                    <img src={logo} alt="Logo" className={style.logo} />
                </div>
                <h2 className={style.titulo}>Iniciar Sesión</h2>
                
                {error && <p className={style.errorMessage}>{error}</p>}
                
                <form className={style.formulario} onSubmit={handleSubmit}>
                    <div className={style.inputGroup}>
                        <label className={style.etiqueta}>Usuario</label>
                        <div className={style.inputWrapper}>
                            <input
                                type="text"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                className={style.input}
                                placeholder="Ingrese su nombre de usuario"
                                required
                            />
                            <i className={`fas fa-user ${style.inputIcon}`}></i>
                        </div>
                    </div>

                    <div className={style.inputGroup}>
                        <label className={style.etiqueta}>Contraseña</label>
                        <div className={style.inputWrapper}>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={style.input}
                                placeholder="Ingrese su contraseña"
                                required
                            />
                            <i className={`fas fa-lock ${style.inputIcon}`}></i>
                            <button 
                                type="button" 
                                className={style.showPasswordButton}
                                onClick={togglePasswordVisibility}
                            >
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                    </div>

                    <div className={style.botones}>
                        <button type="submit" className={style.botonLogin}>Iniciar Sesión</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;