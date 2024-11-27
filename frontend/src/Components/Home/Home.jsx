import logo from "../img/suiza.png";
import style from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    // Navegación según el rol
    const handleNavigation = (role) => {
        console.log(`Navigating to ${role} login`);
        if (role === 'admin') {
            navigate('/menu_admi');
        } else if (role === 'profesor') {
            navigate('/menu_profe');
        } else if (role === 'estudiante') {
            navigate('/menu_stu');
        }
    };

    // Navegación al hacer clic en la imagen
    const handleImageClick = () => {
        navigate("/"); // Cambia a la ruta deseada
    };

    return (
        <div className={style.container}>
            <div className={style.content}>
                <h2 className={style.title}>
                    Bienvenidos al Instituto de Educación Superior Tecnológico Público - "Suiza"
                </h2>
                <div className={style.logoContainer}>
                    <img
                        src={logo}
                        className={style.logo}
                        alt="Logo-Suiza"
                        onClick={handleImageClick} // Añadimos el evento onClick
                        style={{ cursor: 'pointer' }} // Indicador visual para clics
                    />
                </div>
                <div className={style.buttonContainer}>
                    <button
                        className={style.enterButton}
                        onClick={() => handleNavigation('admin')}
                    >
                        Administrador
                    </button>
                    <button
                        className={style.enterButton}
                        onClick={() => handleNavigation('profesor')}
                    >
                        Profesor
                    </button>
                    <button
                        className={style.enterButton}
                        onClick={() => handleNavigation('estudiante')}
                    >
                        Estudiante
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
