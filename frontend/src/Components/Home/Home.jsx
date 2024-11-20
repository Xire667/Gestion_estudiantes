import logo from "../img/suiza.png";
import style from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('a login:');
        navigate('/');
    };

    return (
        <div className={style.contenedor_general}>
            <h2>Bienvenidos al Instituto de Educación Superior Tecnológico Público - "Suiza"</h2>
            <div className={style.contenedor_elementos}>
                <ul className={style.menu_list}>
                    <li><a href="/carrera_list">Carreras</a></li>
                    <li><a href="/curso_list">Cursos</a></li>
                    <li><a href="/roles_list">Roles</a></li>
                    <li><a href="/carrera_list">Estudiantes</a></li>
                    <li><a href="/carrera_list">Docentes</a></li>
                    <li><a href="/register_list">Usuarios</a></li>
                </ul>
            </div>
            <div className={style.contenedor_image}>
                <img src={logo} className={style.logo} alt="Logo-Suiza" onClick={handleSubmit}/>
            </div>
        </div>
    );
}

export default Home;
