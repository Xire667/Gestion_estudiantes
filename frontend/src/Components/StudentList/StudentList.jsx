import { useEffect, useState } from "react";
import useStudentStore from "../../Store/StudentStore";
import useCarreraStore from "../../Store/CarreraStore";
import useRoleStore from "../../Store/RolesStore";
import useCicloStore from "../../Store/CicloStore";
import style from "./StudentList.module.css";

const StudentList = () => {
    const { fetchStudents, students, deleteStudent, updateStudent } = useStudentStore();
    const { fetchCarreras } = useCarreraStore();
    const { fetchRoles } = useRoleStore();
    const { fetchCiclos } = useCicloStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [carreras, setCarreras] = useState([]);
    const [roles, setRoles] = useState([]);
    const [ciclos, setCiclos] = useState([]);
    const [selectedCiclo, setSelectedCiclo] = useState("");
    const [selectedCarrera, setSelectedCarrera] = useState("");

    useEffect(() => {
        fetchStudents();
        const getCarreras = async () => {
            await fetchCarreras();
            const storedCarreras = useCarreraStore.getState().carreras;
            setCarreras(storedCarreras);
        };
        getCarreras();

        const getRoles = async () => {
            await fetchRoles();
            const storedRoles = useRoleStore.getState().roles;
            setRoles(storedRoles);
        };
        getRoles();

        const getCiclos = async () => {
            await fetchCiclos();
            const storedCiclos = useCicloStore.getState().ciclos;
            setCiclos(storedCiclos);
        };
        getCiclos();
    }, []);

    useEffect(() => {
        setFilteredStudents(
            students.filter((student) => {
                const matchesSearchTerm = `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesCiclo = selectedCiclo ? student.id_ciclo === parseInt(selectedCiclo) : true;
                const matchesCarrera = selectedCarrera ? student.id_carrera === parseInt(selectedCarrera) : true;
                return matchesSearchTerm && matchesCiclo && matchesCarrera;
            })
        );
    }, [searchTerm, students, selectedCiclo, selectedCarrera]);

    const handleDelete = (id_student) => {
        if (window.confirm("Are you sure?")) {
            deleteStudent(id_student);
        }
    };

    const handleSelectStudent = (student) => {
        setSelectedStudent(student);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setSelectedStudent({
            ...selectedStudent,
            [name]: value
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateStudent(selectedStudent.id_student, selectedStudent);
        setSelectedStudent(null);
    };

    const handleCloseEdit = () => {
        setSelectedStudent(null);
    };

    const getCarreraName = (id) => {
        const carrera = carreras.find(c => c.id_carrera === id);
        return carrera ? carrera.Name : "Unknown";
    };

    const getRoleName = (id) => {
        const role = roles.find(r => r.id_rol === id);
        return role ? role.Name : "Unknown";
    };

    const getCicloName = (id) => {
        const ciclo = ciclos.find(c => c.id_ciclo === id);
        return ciclo ? ciclo.ciclo : "Unknown";
    };

    return (
        <div className={style.contenedorGeneral}>
            <a href="/student">Ir a Student Form</a>
            <h1>Student List</h1>
            <input
                type="text"
                placeholder="Search student..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={style.searchInput}
            />
            <div className={style.filters}>
                <select
                    value={selectedCiclo}
                    onChange={(e) => setSelectedCiclo(e.target.value)}
                    className={style.cicloSelect}
                >
                    <option value="">All Cycles</option>
                    {ciclos.map((ciclo) => (
                        <option key={ciclo.id_ciclo} value={ciclo.id_ciclo}>
                            {ciclo.ciclo}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedCarrera}
                    onChange={(e) => setSelectedCarrera(e.target.value)}
                    className={style.carreraSelect}
                >
                    <option value="">All Careers</option>
                    {carreras.map((carrera) => (
                        <option key={carrera.id_carrera} value={carrera.id_carrera}>
                            {carrera.Name}
                        </option>
                    ))}
                </select>
            </div>
            <div className={style.container}>
                {filteredStudents.map((user) => (
                    <div key={user.id_student} className={style.listContainer}>
                        DNI:
                        <h3>{user.dni}</h3>
                        First Name:
                        <h3>{user.firstName}</h3>
                        Last Name:
                        <h3>{user.lastName}</h3>
                        Email:
                        <h3>{user.email}</h3>
                        Phone:
                        <h3>{user.phone}</h3>
                        Carrera:
                        <h3>{getCarreraName(user.id_carrera)}</h3>
                        Ciclo:
                        <h3>{getCicloName(user.id_ciclo)}</h3>
                        Role:
                        <h3>{getRoleName(user.id_rol)}</h3>
                        <div className={style.buttonGroup}>
                            <button className={style.delete} onClick={() => handleDelete(user.id_student)}>❌</button>
                            <button className={style.edit} onClick={() => handleSelectStudent(user)}>✍️</button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedStudent && (
                <div className={style.editContainer}>
                    <button className={style.closeButton} onClick={handleCloseEdit}>❌</button>
                    <h2>Edit Students</h2>
                    <form onSubmit={handleEditSubmit}>
                        <label>
                            DNI:
                            <input
                                type="text"
                                name="dni"
                                value={selectedStudent.dni}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            First Name:
                            <input
                                type="text"
                                name="firstName"
                                value={selectedStudent.firstName}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Last Name:
                            <input
                                type="text"
                                name="lastName"
                                value={selectedStudent.lastName}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="text"
                                name="email"
                                value={selectedStudent.email}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Phone:
                            <input
                                type="text"
                                name="phone"
                                value={selectedStudent.phone}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Carrera:
                            <select
                                name="id_carrera"
                                value={selectedStudent.id_carrera}
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
                            Ciclo:
                            <select
                                name="id_ciclo"
                                value={selectedStudent.id_ciclo}
                                onChange={handleEditChange}
                            >
                                {ciclos.map((ciclo) => (
                                    <option key={ciclo.id_ciclo} value={ciclo.id_ciclo}>
                                        {ciclo.ciclo}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Role:
                            <select
                                name="id_rol"
                                value={selectedStudent.id_rol}
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

export default StudentList;
