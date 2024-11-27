import { Outlet, useNavigate } from "react-router-dom";
import style from "./SidebarLayout.module.css";
import suiza from "../img/suiza.png"; // Imagen del logo

const SidebarLayout = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className={style.container}>
            {/* Barra lateral */}
            <aside className={style.sidebar}>
                <div className={style.logoContainer}>
                    <img src={suiza} alt="Logo Suiza" className={style.logo} />
                </div>
                <nav className={style.navMenu}>
                    <button className={style.navButton} onClick={() => handleNavigation('/carrera')}>Carrera Form</button>
                    <button className={style.navButton} onClick={() => handleNavigation('/carrera_list')}>Carrera List</button>
                    <button className={style.navButton} onClick={() => handleNavigation('/curso')}>Curso Form</button>
                    <button className={style.navButton} onClick={() => handleNavigation('/curso_list')}>Curso List</button>
                    <button className={style.navButton} onClick={() => handleNavigation('/roles')}>Roles Form</button>
                    <button className={style.navButton} onClick={() => handleNavigation('/roles_list')}>Roles List</button>
                    <button className={style.navButton} onClick={() => handleNavigation('/student')}>Student Form</button>
                    <button className={style.navButton} onClick={() => handleNavigation('/student_list')}>Student List</button>
                    <button className={style.navButton} onClick={() => handleNavigation('/matricula')}>Matricula Form</button>
                    <button className={style.navButton} onClick={() => handleNavigation('/matricula_list')}>Matricula List</button>
                    <button className={style.navButton} onClick={() => handleNavigation('/notas')}>Notas Form</button>
                    <button className={style.navButton} onClick={() => handleNavigation('/notas_list')}>Notas List</button>
                    <button className={style.navButton} onClick={() => handleNavigation('/teacher')}>Teacher Form</button>
                    <button className={style.navButton} onClick={() => handleNavigation('/teacher_list')}>Teacher List</button>
                </nav>
            </aside>

            {/* Contenido principal */}
            <main className={style.mainContent}>
                <Outlet /> {/* Renderiza las rutas hijas aquí */}
            </main>
        </div>
    );
};

export default SidebarLayout;
