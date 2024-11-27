import { useEffect, useState } from "react";
import useTeachersStore from "../../Store/TeachersStore";  // Suponiendo que tengas un store similar para Teachers
import useCarreraStore from "../../Store/CarreraStore";   // Store para carreras
import useRoleStore from "../../Store/RolesStore";        // Store para roles
import style from "./TeachersList.module.css";
import { useNavigate } from "react-router-dom";


const TeachersList = () => {
    const navigate = useNavigate();

    const { fetchTeachers, teachers, deleteTeacher, updateTeacher } = useTeachersStore();
    const { fetchCarreras, carreras } = useCarreraStore(); // Obtener carreras
    const { fetchRoles, roles } = useRoleStore();         // Obtener roles
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

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

    const handleDelete = (id_teacher) => {
        if (window.confirm("Are you sure?")) {
            deleteTeacher(id_teacher);
        }
    };

    const handleSelectTeacher = (teacher) => {
        setSelectedTeacher(teacher);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setSelectedTeacher({
            ...selectedTeacher,
            [name]: value
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateTeacher(selectedTeacher.id_teacher, selectedTeacher);
        setSelectedTeacher(null);
    };

    const handleCloseEdit = () => {
        setSelectedTeacher(null);
    };

    // Obtener la carrera y el rol por su ID
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
            <button className={style.backButton} onClick={() => navigate(-1)}>
                        Volver
                    </button>
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
                        <div className={style.buttonGroup}>
                            <button className={style.delete} onClick={() => handleDelete(teacher.id_teacher)}>❌</button>
                            <button className={style.edit} onClick={() => handleSelectTeacher(teacher)}>✍️</button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedTeacher && (
                <div className={style.editContainer}>
                    <button className={style.closeButton} onClick={handleCloseEdit}>❌</button>
                    <h2>Edit Teacher</h2>
                    <form onSubmit={handleEditSubmit}>
                        <label>
                            First Name:
                            <input
                                type="text"
                                name="firstName"
                                value={selectedTeacher.firstName}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Last Name:
                            <input
                                type="text"
                                name="lastName"
                                value={selectedTeacher.lastName}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={selectedTeacher.email}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Phone:
                            <input
                                type="text"
                                name="phone"
                                value={selectedTeacher.phone}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Career:
                            <select
                                name="id_carrera"
                                value={selectedTeacher.id_carrera}
                                onChange={handleEditChange}
                            >
                                {carreras.map((carrera) => (
                                    <option key={carrera.id_carrera} value={carrera.id_carrera}>
                                        {carrera.Name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Role:
                            <select
                                name="id_rol"
                                value={selectedTeacher.id_rol}
                                onChange={handleEditChange}
                            >
                                {roles.map((role) => (
                                    <option key={role.id_rol} value={role.id_rol}>
                                        {role.Name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <button type="submit">Save</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default TeachersList;
