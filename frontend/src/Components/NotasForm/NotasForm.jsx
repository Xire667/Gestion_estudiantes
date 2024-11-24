import { useState, useEffect } from "react";
import styles from "./NotasForm.module.css";
import useNotaStore from "../../Store/NotaStore";
import useStudentStore from "../../Store/StudentStore";
import useCursoStore from "../../Store/CursoStore";

const NotasForm = () => {
    const { addNota, fetchNotas } = useNotaStore();
    const { fetchCursos } = useCursoStore();
    const { fetchStudents } = useStudentStore();
    const [notaData, setNotaData] = useState({
        id_student: "",
        id_curso: "",
        nota_1: "",
        nota_2: "",
        nota_3: "",
        promedio: ""
    });

    const [cursos, setCursos] = useState([]);
    const [students, setStudents] = useState([]);
    const [promedioActual, setPromedioActual] = useState(""); 

    useEffect(() => {
        const getCursos = async () => {
            await fetchCursos();
            const storedCursos = useCursoStore.getState().cursos;
            setCursos(storedCursos);
        };
        getCursos();

        const getStudents = async () => {
            await fetchStudents();
            const storedStudents = useStudentStore.getState().students;
            setStudents(storedStudents);
        };
        getStudents();
    }, [fetchCursos, fetchStudents]);

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
            // Asegúrate de que los datos están formateados correctamente
            const notaDataFormatted = {
                ...notaData,
                nota_1: parseFloat(notaData.nota_1),
                nota_2: parseFloat(notaData.nota_2),
                nota_3: parseFloat(notaData.nota_3),
                promedio: parseFloat(promedioActual)
            };
    
            console.log("Sending data to backend:", notaDataFormatted);  // Agregar log
    
            await addNota(notaDataFormatted);
            
            // Resetear el formulario después de enviar los datos
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
            console.error("Error adding nota:", error.message);
            alert("There was an error adding the nota.");
        }
    };

    return (
        <div className={styles.formContainer}>
            <a href="/home">IR a HOME</a>
            <div className={styles.formContent}>
                <h1 className={styles.title}>Notas Form</h1>
                <form onSubmit={handleSubmit}>
                    <label className={styles.label}>Student:</label>
                    <select
                        className={styles.input}
                        name="id_student"
                        value={notaData.id_student}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select a student</option>
                        {students.map((student) => (
                            <option key={student.id_student} value={student.id_student}>
                                {student.firstName} {student.lastName}
                            </option>
                        ))}
                    </select>

                    <label className={styles.label}>Curso:</label>
                    <select
                        className={styles.input}
                        name="id_curso"
                        value={notaData.id_curso}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select a course</option>
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

                <h2 className={styles.title}>Notas List</h2>
            </div>
        </div>
    );
};

export default NotasForm;
