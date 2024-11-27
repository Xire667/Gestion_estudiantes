import { useState, useEffect } from "react";
import useMatriculaStore from "../../Store/MatriculaStore";
import useCarreraStore from "../../Store/CarreraStore";
import useStudentStore from "../../Store/StudentStore";
import style from "./MatriculaList.module.css";

const MatriculasList = () => {
    const { fetchMatriculas, matriculas, deleteMatricula, updateMatricula } = useMatriculaStore();
    const { fetchCarreras } = useCarreraStore();
    const { fetchStudents } = useStudentStore();

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMatriculas, setFilteredMatriculas] = useState([]);
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [selectedCarrera, setSelectedCarrera] = useState(""); 
    const [selectedMatricula, setSelectedMatricula] = useState(null);
    const [ciclos, setCiclos] = useState([1, 2, 3, 4, 5, 6]);
    const [selectedCiclo, setSelectedCiclo] = useState("");
    const [editSelectedCiclo, setEditSelectedCiclo] = useState("");
    const [studentSearchTerm, setStudentSearchTerm] = useState(""); // Nueva variable de estado para búsqueda de estudiantes

    useEffect(() => {
        fetchMatriculas();
        fetchCarreras();
        fetchStudents();
    }, []);

    useEffect(() => {
        setCarreras(useCarreraStore.getState().carreras);
        setStudents(useStudentStore.getState().students);
    }, []);

    useEffect(() => {
        setFilteredMatriculas(
            matriculas.filter((matricula) =>
                (`${matricula.estado}`.toLowerCase().includes(searchTerm.toLowerCase()) &&
                    (selectedCarrera ? matricula.id_carrera === parseInt(selectedCarrera) : true) &&
                    (selectedCiclo ? matricula.id_ciclo === parseInt(selectedCiclo) : true))
            )
        );
    }, [searchTerm, matriculas, selectedCarrera, selectedCiclo]);

    // Filtrado de estudiantes para la búsqueda por nombre
    useEffect(() => {
        setFilteredStudents(
            students.filter(student =>
                student.firstName.toLowerCase().includes(studentSearchTerm.toLowerCase())
            )
        );
    }, [studentSearchTerm, students]);

    const handleDelete = (id_matricula) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta matrícula?")) {
            deleteMatricula(id_matricula);
        }
    };

    const handleSelectMatricula = (matricula) => {
        setSelectedMatricula({...matricula});
        setEditSelectedCiclo(matricula.id_ciclo.toString());
    };

    const handleCloseEdit = () => {
        setSelectedMatricula(null);
        setEditSelectedCiclo("");
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setSelectedMatricula(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (selectedMatricula) {
            updateMatricula(selectedMatricula.id_matricula, selectedMatricula);
            setSelectedMatricula(null);
            setEditSelectedCiclo("");
        }
    };

    return (
        <div className={style.contenedorGeneral}>
            <a href="/home">Ir a Home</a>
            <h1>Lista de Matrículas</h1>

            <div className={style.filterContainer}>
                {/* Ciclo Filter */}
                <select
                    className={style.input}
                    value={selectedCiclo}
                    onChange={(e) => setSelectedCiclo(e.target.value)}
                >
                    <option value="">Seleccionar Ciclo</option>
                    {ciclos.map((ciclo) => (
                        <option key={ciclo} value={ciclo}>
                            Ciclo {ciclo}
                        </option>
                    ))}
                </select>

                {/* Carrera Filter */}
                <select
                    className={style.input}
                    value={selectedCarrera}
                    onChange={(e) => setSelectedCarrera(e.target.value)}
                >
                    <option value="">Seleccionar carrera</option>
                    {carreras.map((carrera) => (
                        <option key={carrera.id_carrera} value={carrera.id_carrera}>
                            {carrera.Name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Buscar matrícula..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={style.searchInput}
                />
            </div>

            <div className={style.container}>
                {filteredMatriculas.map((matricula) => {
                    const estudiante = students.find(student => student.id_student === matricula.id_student);
                    const carrera = carreras.find(carrera => carrera.id_carrera === matricula.id_carrera);
                    
                    return (
                        <div key={matricula.id_matricula} className={style.listContainer}>
                            <h3>{matricula.estado}</h3>
                            <p>{matricula.description}</p>
                            <p>Carrera: {carrera ? carrera.Name : "Carrera no encontrada"}</p>
                            <p>Estudiante: {estudiante ? `${estudiante.firstName} ${estudiante.lastName}` : "Estudiante no encontrado"}</p>
                            <div className={style.buttonGroup}>
                                <button className={style.delete} onClick={() => handleDelete(matricula.id_matricula)}>❌</button>
                                <button className={style.edit} onClick={() => handleSelectMatricula(matricula)}>✍️</button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {selectedMatricula && (
                <div className={style.editContainer}>
                    <button className={style.closeButton} onClick={handleCloseEdit}>❌</button>
                    <h2>Editar Matrícula</h2>
                    <form onSubmit={handleEditSubmit}>
                        <label>
                            Estado:
                            <input
                                type="text"
                                name="estado"
                                value={selectedMatricula.estado}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Descripción:
                            <input
                                type="text"
                                name="description"
                                value={selectedMatricula.description}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Carrera:
                            <select
                                name="id_carrera"
                                value={selectedMatricula.id_carrera}
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
                            Buscar Estudiante:
                            <input
                                type="text"
                                placeholder="Buscar estudiante por nombre"
                                value={studentSearchTerm}
                                onChange={(e) => setStudentSearchTerm(e.target.value)}
                                className={style.searchInput}
                            />
                        </label>
                        <label>
                            Estudiante:
                            <select
                                name="id_student"
                                value={selectedMatricula.id_student}
                                onChange={handleEditChange}
                            >
                                <option value="">Seleccionar Estudiante</option>
                                {filteredStudents.map((student) => (
                                    <option key={student.id_student} value={student.id_student}>
                                        {student.firstName} {student.lastName} (Ciclo {student.id_ciclo})
                                    </option>
                                ))}
                            </select>
                        </label>
                        <button type="submit">Guardar</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default MatriculasList;
