import { useEffect, useState } from "react";
import useTeachersStore from "../../Store/TeachersStore";
import useCarreraStore from "../../Store/CarreraStore"; 
import useRoleStore from "../../Store/RolesStore"; 
import { useNavigate } from "react-router-dom";
import style from "./TeachersListStu.module.css";

const TeachersListStu = () => {
    const { fetchTeachers, teachers } = useTeachersStore();
    const { fetchCarreras, carreras } = useCarreraStore();
    const { fetchRoles, roles } = useRoleStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredTeachers, setFilteredTeachers] = useState([]);

    const navigate = useNavigate(); // Hook para navegar a la página anterior

    useEffect(() => {
        fetchTeachers();
        fetchCarreras();
        fetchRoles();
    }, []);

    useEffect(() => {
        setFilteredTeachers(
            teachers.filter((teacher) =>
                `${teacher.firstName} ${teacher.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, teachers]);

    const getCarreraName = (id_carrera) => {
        const carrera = carreras.find(c => c.id_carrera === id_carrera);
        return carrera ? carrera.Name : "N/A";
    };

    const getRoleName = (id_rol) => {
        const role = roles.find(r => r.id_rol === id_rol);
        return role ? role.Name : "N/A";
    };

    return (
        <div className={style.contenedorGeneral}>
            <button className={style.backButton} onClick={() => navigate(-1)}>Volver</button> {/* Botón de Volver */}
            <h1>Teachers List</h1>
            <input
                type="text"
                placeholder="Search teacher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={style.searchInput}
            />
            <div className={style.container}>
                {filteredTeachers.map((teacher) => (
                    <div key={teacher.id_teacher} className={style.listContainer}>
                        <h3>{teacher.firstName} {teacher.lastName}</h3>
                        <p>Email: {teacher.email}</p>
                        <p>Phone: {teacher.phone}</p>
                        <p>Career: {getCarreraName(teacher.id_carrera)}</p>
                        <p>Role: {getRoleName(teacher.id_rol)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeachersListStu;
