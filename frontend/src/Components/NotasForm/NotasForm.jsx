import { useState, useEffect } from "react";
import styles from "./NotasForm.module.css";
import useNotaStore from "../../Store/NotaStore";
import useStudentStore from "../../Store/StudentStore";
import useCursoStore from "../../Store/CursoStore";
import useCicloStore from "../../Store/CicloStore";
import { useNavigate } from "react-router-dom";


const NotasForm = () => {
    const navigate = useNavigate();

    const { addNota, fetchNotas } = useNotaStore();
    const { fetchCursos } = useCursoStore();
    const { fetchStudents } = useStudentStore();
    const { fetchCiclos } = useCicloStore();

    const [originalCiclos, setOriginalCiclos] = useState([]);
    const [originalStudents, setOriginalStudents] = useState([]);
    const [originalCursos, setOriginalCursos] = useState([]);

    const [ciclos, setCiclos] = useState([]);
    const [students, setStudents] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [selectedCiclo, setSelectedCiclo] = useState("");

    const [notaData, setNotaData] = useState({
        id_student: "",
        id_curso: "",
        nota_1: "",
        nota_2: "",
        nota_3: "",
        promedio: ""
    });

    const [promedioActual, setPromedioActual] = useState(""); 

    // Initial data fetching
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                await fetchCiclos();
                await fetchCursos();
                await fetchStudents();

                const storedCiclos = useCicloStore.getState().ciclos;
                const storedCursos = useCursoStore.getState().cursos;
                const storedStudents = useStudentStore.getState().students;

                setOriginalCiclos(storedCiclos);
                setOriginalCursos(storedCursos);
                setOriginalStudents(storedStudents);

                setCiclos(storedCiclos);
                setCursos(storedCursos);
                setStudents(storedStudents);
            } catch (error) {
                console.error("Error loading initial data:", error);
            }
        };

        loadInitialData();
    }, []);

    useEffect(() => {
        console.log("Selected ciclo:", selectedCiclo);  // Depuración
        console.log("Original students:", originalStudents);  // Depuración
    
        if (selectedCiclo) {
            const filteredStudents = originalStudents.filter(
                student => student.id_ciclo === Number(selectedCiclo)
            );
            const filteredCursos = originalCursos.filter(
                curso => curso.id_ciclo === Number(selectedCiclo)
            );           
            console.log("Filtered students:", filteredStudents);  // Depuración
            setStudents(filteredStudents);
            setCursos(filteredCursos);
        } else {
            setStudents(originalStudents);
            setCursos(originalCursos);
        }
    }, [selectedCiclo, originalStudents, originalCursos]);

    // Average calculation effect
    useEffect(() => {
        const { nota_1, nota_2, nota_3 } = notaData;
        if (nota_1 && nota_2 && nota_3) {
            const promedio = (
                (parseFloat(nota_1) + parseFloat(nota_2) + parseFloat(nota_3)) / 3
            ).toFixed(2);
            setPromedioActual(promedio);
        } else {
            setPromedioActual("");
        }
    }, [notaData.nota_1, notaData.nota_2, notaData.nota_3]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if ((name.includes('nota_') && (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= 20))) || !name.includes('nota_')) {
            setNotaData({
                ...notaData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const notaDataFormatted = {
                ...notaData,
                nota_1: parseFloat(notaData.nota_1),
                nota_2: parseFloat(notaData.nota_2),
                nota_3: parseFloat(notaData.nota_3),
                promedio: parseFloat(promedioActual)
            };
    
            console.log("Formatted data:", notaDataFormatted);
    
            try {
                const response = await addNota(notaDataFormatted);
                console.log("Backend response:", response);
            } catch (backendError) {
                console.error("Backend error details:", backendError.response?.data);
                alert(`Backend error: ${backendError.response?.data?.message || 'Unknown error'}`);
            }
            await addNota(notaDataFormatted);
            
            // Reset the form
            setNotaData({
                id_student: "",
                id_curso: "",
                nota_1: "",
                nota_2: "",
                nota_3: "",
                promedio: ""
            });
            setPromedioActual("");
    
            alert("Nota added successfully!");
        } catch (error) {
            console.error("Frontend error:", error);
            alert("There was an error adding the nota.");
        }
    };

    return (
        <div className={styles.formContainer}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>
                        Volver
                    </button>
            <div className={styles.formContent}>
                <h1 className={styles.title}>Notas Form</h1>
                <form onSubmit={handleSubmit}>
                    {/* Cycle Selection */}
                    <label className={styles.label}>Ciclo:</label>
                    <select
                        className={styles.input}
                        name="id_ciclo"
                        value={selectedCiclo}
                        onChange={(e) => setSelectedCiclo(e.target.value)}
                        required
                    >
                        <option value="">Select a ciclo</option>
                        {originalCiclos.map((ciclo) => (
                            <option key={ciclo.id_ciclo} value={ciclo.id_ciclo}>
                                {ciclo.ciclo}
                            </option>
                        ))}
                    </select>

                    {/* Student Selection */}
                    <label className={styles.label}>Student:</label>
                    <select
                        className={styles.input}
                        name="id_student"
                        value={notaData.id_student}
                        onChange={handleInputChange}
                        required
                        disabled={!selectedCiclo}
                    >
                        <option value="">
                            {!selectedCiclo 
                                ? "First select a cycle" 
                                : students.length 
                                    ? "Select a student" 
                                    : "No students in this cycle"}
                        </option>
                        {students.map((student) => (
                            <option key={student.id_student} value={student.id_student}>
                                {student.firstName} {student.lastName}
                            </option>
                        ))}
                    </select>

                    {/* Course Selection */}
                    <label className={styles.label}>Curso:</label>
                    <select
                        className={styles.input}
                        name="id_curso"
                        value={notaData.id_curso}
                        onChange={handleInputChange}
                        required
                        disabled={!notaData.id_student}
                    >
                        <option value="">
                            {!notaData.id_student 
                                ? "First select a student" 
                                : cursos.length 
                                    ? "Select a course" 
                                    : "No courses in this cycle"}
                        </option>
                        {cursos.map((curso) => (
                            <option key={curso.id_curso} value={curso.id_curso}>
                                {curso.Name}
                            </option>
                        ))}
                    </select>

                    <label className={styles.label}>Nota 1:</label>
                    <input
                        className={styles.input}
                        type="number"
                        step="0.01"
                        min="0"
                        max="20"
                        placeholder="Enter nota 1 (0-20)"
                        required
                        name="nota_1"
                        value={notaData.nota_1}
                        onChange={handleInputChange}
                    />

                    <label className={styles.label}>Nota 2:</label>
                    <input
                        className={styles.input}
                        type="number"
                        step="0.01"
                        min="0"
                        max="20"
                        placeholder="Enter nota 2 (0-20)"
                        required
                        name="nota_2"
                        value={notaData.nota_2}
                        onChange={handleInputChange}
                    />

                    <label className={styles.label}>Nota 3:</label>
                    <input
                        className={styles.input}
                        type="number"
                        step="0.01"
                        min="0"
                        max="20"
                        placeholder="Enter nota 3 (0-20)"
                        required
                        name="nota_3"
                        value={notaData.nota_3}
                        onChange={handleInputChange}
                    />

<div className={styles.promedioContainer}>
                        <label className={styles.label}>Promedio:</label>
                        <div className={styles.promedio}>
                            {promedioActual ? (
                                <>
                                    <span className={styles.promedioValue}>{promedioActual}</span>
                                    <span className={styles.promedioStatus}>
                                        {parseFloat(promedioActual) >= 12.5 ? 
                                            " (Aprobado)" : 
                                            " (Desaprobado)"}
                                    </span>
                                </>
                            ) : (
                                <span className={styles.promedioPlaceholder}>
                                    Ingrese las tres notas para ver el promedio
                                </span>
                            )}
                        </div>
                    </div>

                    <button 
                        className={styles.button} 
                        type="submit"
                        disabled={!promedioActual}
                    >
                        Save
                    </button>
                </form>

                <h2 className={styles.promedioText}>Promedio: {promedioActual}</h2>
            </div>
        </div>
    );
};

export default NotasForm;
