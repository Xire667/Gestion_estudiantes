import style from './LoginForm.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica de autenticación
        console.log('Datos del formulario:', formData);
        // Después de la autenticación exitosa, navegar a /home
        navigate('/home');
    };

    return (
        <div className={style.contenedorGeneral}>
            <div className={style.contenedorLogin}>
                <h2 className={style.titulo}>Login</h2>
                <form className={style.formulario} onSubmit={handleSubmit}>
                    <label className={style.etiqueta}>
                        User:
                        <input
                            type="text"
                            name="user"
                            value={formData.user}
                            onChange={handleChange}
                            className={style.input}
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
                        />
                    </label>
                    <div className={style.botones}>
                        <button type="submit" className={style.boton}>Iniciar Sesión</button>
                        <button type="button" className={style.botonSecundario}>Registrarse</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;