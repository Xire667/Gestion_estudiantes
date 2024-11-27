import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MenuPrincipal.module.css';
import logo from '../img/suiza.png';

const MenuPrincipal = () => {
    const navigate = useNavigate();

    const handleEnter = () => {
        navigate('/login');
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Sistema de Gestión Académica</h1>
                
                <div className={styles.logoContainer}>
                    <img src={logo} alt="Logo Instituto" className={styles.logo} />
                </div>

                <button 
                    className={styles.enterButton} 
                    onClick={handleEnter}
                >
                    Ingresar
                </button>
            </div>

            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.systemInfo}>
                        <h3>Sistema de Gestión Académica</h3>
                        <p>Instituto de Educación Superior Tecnológico Público - "Suiza"</p>
                        <p>Versión 1.0 | © 2024 Todos los derechos reservados</p>
                    </div>
                    <div className={styles.contactInfo}>
                        <h4>Contacto</h4>
                        <p>Teléfono: 961 266 281</p>
                        <p>Email: xire667@gmail.com </p>
                        <p>Dirección: A.A.H.H Nuevo Mundo, Ciudad de Pucallpa</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MenuPrincipal;