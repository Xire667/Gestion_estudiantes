import { useState, useEffect } from "react";
import styles from "./StudentForm.module.css";
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

    const [cursos, setCursos] = useState([]); // Estado para almacenar los cursos disponibles
    const [students, setStudents] = useState([]); // Estado para almacenar los estudiantes disponibles

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNotaData({
            ...notaData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Calculamos el promedio antes de enviar los datos
        const promedioCalculado = (
            (parseFloat(notaData.nota_1) + parseFloat(notaData.nota_2) + parseFloat(notaData.nota_3)) / 3
        ).toFixed(2);
        
        try {
            await addNota({ ...notaData, promedio: promedioCalculado });

            setNotaData({
                id_student: "",
                id_curso: "",
                nota_1: "",
                nota_2: "",
                nota_3: "",
                promedio: ""
            });

            alert("Nota added successfully!");
        } catch (error) {
            console.error("Error adding nota", error.message);
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
                        placeholder="Enter nota 1"
                        required
                        name="nota_1"
                        value={notaData.nota_1}
                        onChange={handleInputChange}
                    />

                    <label className={styles.label}>Nota 2:</label>
                    <input
                        className={styles.input}
                        type="number"
                        placeholder="Enter nota 2"
                        required
                        name="nota_2"
                        value={notaData.nota_2}
                        onChange={handleInputChange}
                    />

                    <label className={styles.label}>Nota 3:</label>
                    <input
                        className={styles.input}
                        type="number"
                        placeholder="Enter nota 3"
                        required
                        name="nota_3"
                        value={notaData.nota_3}
                        onChange={handleInputChange}
                    />

                    <button className={styles.button} type="submit">
                        Save
                    </button>
                </form>

                <h2 className={styles.title}>Notas List</h2>
                {/* Aquí puedes agregar una lista para mostrar las notas si es necesario */}
            </div>
        </div>
    );
};

export default NotasForm;
