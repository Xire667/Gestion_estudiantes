import { useState, useEffect } from "react"; 
import useNotaStore from "../../Store/NotaStore";
import useCarreraStore from "../../Store/CarreraStore";
import useStudentStore from "../../Store/StudentStore";
import useCursoStore from "../../Store/CursoStore";
import { useNavigate } from "react-router-dom"; // Para poder navegar
import style from "./NotasListStu.module.css";

const NotasListStu = () => {
    const { fetchNotas, notas } = useNotaStore();
    const { fetchCarreras } = useCarreraStore();
    const { fetchStudents } = useStudentStore();
    const { fetchCursos } = useCursoStore();
    const navigate = useNavigate(); // Para usar la función navigate

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredNotas, setFilteredNotas] = useState([]);
    const [students, setStudents] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [cursos, setCursos] = useState([]);

    const [selectedCarrera, setSelectedCarrera] = useState("");
    const [selectedStudent, setSelectedStudent] = useState("");

    useEffect(() => {
        fetchNotas();
        fetchCarreras();
        fetchStudents();
        fetchCursos();

        const unsubscribeCarreras = useCarreraStore.subscribe(
            (state) => setCarreras(state.carreras)
        );
        const unsubscribeStudents = useStudentStore.subscribe(
            (state) => setStudents(state.students)
        );
        const unsubscribeCursos = useCursoStore.subscribe(
            (state) => setCursos(state.cursos)
        );

        // Initial fetch
        setCarreras(useCarreraStore.getState().carreras);
        setStudents(useStudentStore.getState().students);
        setCursos(useCursoStore.getState().cursos);

        // Cleanup subscriptions
        return () => {
            unsubscribeCarreras();
            unsubscribeStudents();
            unsubscribeCursos();
        };
    }, []);

    useEffect(() => {
        const filteredResults = notas.filter((nota) => {
            const student = students.find(s => s.id_student === nota.id_student);
            const curso = cursos.find(c => c.id_curso === nota.id_curso);
        
            return (
                (selectedCarrera ? student?.id_carrera === parseInt(selectedCarrera) : true) &&
                (selectedStudent ? nota.id_student === parseInt(selectedStudent) : true) &&
                (searchTerm ? curso?.Name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
            );
        });

        setFilteredNotas(filteredResults);
    }, [notas, students, cursos, selectedCarrera, selectedStudent, searchTerm]);

    return (
        <div className={style.contenedorGeneral}>
            <h1>Lista de Notas</h1>
            <button className={style.backButton} onClick={() => navigate(-1)}>Volver</button>

            <div className={style.filterContainer}>
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

                {/* Student Filter */}
                <select
                    className={style.input}
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                >
                    <option value="">Seleccionar Estudiante</option>
                    {students.map((student) => (
                        <option key={student.id_student} value={student.id_student}>
                            {student.firstName} {student.lastName}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Buscar por curso..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={style.searchInput}
                />
            </div>

            <div className={style.container}>
                {filteredNotas.map((nota) => {
                    const estudiante = students.find(student => student.id_student === nota.id_student);
                    const curso = cursos.find(curso => curso.id_curso === nota.id_curso);
                    const carrera = carreras.find(carrera => carrera.id_carrera === estudiante?.id_carrera);
                    
                    return (
                        <div key={nota.id_nota} className={style.listContainer}>
                            <h3>Curso: {curso ? curso.Name : "Curso no encontrado"}</h3>
                            <p>Estudiante: {estudiante ? `${estudiante.firstName} ${estudiante.lastName}` : "Estudiante no encontrado"}</p>
                            <p>Carrera: {carrera ? carrera.Name : "Carrera no encontrada"}</p>
                            <div className={style.notasContainer}>
                                <p>Nota 1: {nota.nota_1}</p>
                                <p>Nota 2: {nota.nota_2}</p>
                                <p>Nota 3: {nota.nota_3}</p>
                                <p>Promedio: {nota.promedio}</p>
                                <p>Estado: {nota.promedio >= 12.5 ? "Aprobado" : "Desaprobado"}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NotasListStu;
