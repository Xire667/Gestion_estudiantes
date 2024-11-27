import { useNavigate } from "react-router-dom";
import style from "./MenuStudent.module.css";
import suiza from "../img/suiza.png"; // Importar la imagen

const Menu_Student = () => {
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
                    <button className={style.menuButton} onClick={() => handleNavigation('/carrera_list')}>Carrera List</button>
                    <button className={style.menuButton} onClick={() => handleNavigation('/curso_list_stu')}>Curso List</button>
                    <button className={style.menuButton} onClick={() => handleNavigation('/notas_list_stu')}>Notas List</button>
                    <button className={style.menuButton} onClick={() => handleNavigation('/teacher_list_stu')}>Teacher List</button>
                </div>
            </div>
        </div>
    );
};

export default Menu_Student;
