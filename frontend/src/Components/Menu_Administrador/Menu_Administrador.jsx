import { useNavigate } from "react-router-dom";
import style from "./Menu_Administrador.module.css";
import suiza from "../img/suiza.png"; // Importar la imagen

const Menu_Administrador = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className={style.container}>
            <div className={style.content}>
                <img src={suiza} alt="Admin" className={style.adminImage} /> {/* Imagen del administrador */}
                <h2 className={style.title}>Menú Administrador</h2>
                <div className={style.buttonContainer}>
                    <button className={style.menuButton} onClick={() => handleNavigation('/carrera')}>Carrera Form</button>
                    <button className={style.menuButton} onClick={() => handleNavigation('/carrera_list')}>Carrera List</button>
                    <button className={style.menuButton} onClick={() => handleNavigation('/curso')}>Curso Form</button>
                    <button className={style.menuButton} onClick={() => handleNavigation('/curso_list')}>Curso List</button>
                    <button className={style.menuButton} onClick={() => handleNavigation('/roles')}>Roles Form</button>
                    <button className={style.menuButton} onClick={() => handleNavigation('/roles_list')}>Roles List</button>
                    <button className={style.menuButton} onClick={() => handleNavigation('/student')}>Student Form</button>
                    <button className={style.menuButton} onClick={() => handleNavigation('/student_list')}>Student List</button>
                    <button className={style.menuButton} onClick={() => handleNavigation('/matricula')}>Matricula Form</button>
                    <button className={style.menuButton} onClick={() => handleNavigation('/matricula_list')}>Matricula List</button>
                    <button className={style.menuButton} onClick={() => handleNavigation('/notas')}>Notas Form</button>
                    <button className={style.menuButton} onClick={() => handleNavigation('/notas_list')}>Notas List</button>
                    <button className={style.menuButton} onClick={() => handleNavigation('/teacher')}>Teacher Form</button>
                    <button className={style.menuButton} onClick={() => handleNavigation('/teacher_list')}>Teacher List</button>
                    <button className={style.backButton} onClick={() => navigate(-1)}>
                        Volver
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Menu_Administrador;
