import { useState, useEffect } from "react";
import styles from "./MatriculaForm.module.css";
import useMatriculaStore from "../../Store/MatriculaStore";
import useCarreraStore from "../../Store/CarreraStore";
import useStudentStore from "../../Store/StudentStore";

const MatriculaForm = () => {
    const { addMatricula } = useMatriculaStore();
    const { fetchCarreras } = useCarreraStore();
    const { fetchStudents } = useStudentStore();

    const [matriculaData, setMatriculaData] = useState({
        estado: "",
        description: "",
        id_student: "",
        id_carrera: "",
    });

    const [carreras, setCarreras] = useState([]); // Estado para almacenar las carreras disponibles
    const [students, setStudents] = useState([]); // Estado para almacenar los estudiantes disponibles

    useEffect(() => {
        // Llamamos a fetchCarreras y seteamos las carreras
        const getCarreras = async () => {
            await fetchCarreras();
            const storedCarreras = useCarreraStore.getState().carreras;
            setCarreras(storedCarreras);
        };
        getCarreras();

        // Llamamos a fetchStudents y seteamos los estudiantes
        const getStudents = async () => {
            await fetchStudents();
            const storedStudents = useStudentStore.getState().students;
            setStudents(storedStudents);
        };
        getStudents();
    }, [fetchCarreras, fetchStudents]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMatriculaData({
            ...matriculaData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Crear la matrícula
            const newMatricula = {
                estado: matriculaData.estado,
                description: matriculaData.description,
                id_student: matriculaData.id_student,
                id_carrera: matriculaData.id_carrera,
            };
    
            const createdMatricula = await addMatricula(newMatricula);
    
            // Verifica si la matrícula fue creada
            if (!createdMatricula || !createdMatricula.id_matricula) {
                throw new Error("Error al crear la matrícula");
            }
    
            // Resetear los campos después de guardar
            setMatriculaData({
                estado: "",
                description: "",
                id_student: "",
                id_carrera: "",
            });
    
            alert("Matrícula creada con éxito!");
        } catch (error) {
            console.error("Error al crear matrícula", error.message);
            alert("Hubo un error al crear la matrícula.");
        }
    };

    return (
        <div className={styles.formContainer}>
            <a href="/home">IR a HOME</a>
            <div className={styles.formContent}>
                <h1 className={styles.title}>Matrícula Form</h1>
                <form onSubmit={handleSubmit}>
                    <label className={styles.label}>Estado:</label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Ingrese el estado"
                        required
                        name="estado"
                        value={matriculaData.estado}
                        onChange={handleInputChange}
                    />

                    <label className={styles.label}>Descripción:</label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Ingrese la descripción"
                        required
                        name="description"
                        value={matriculaData.description}
                        onChange={handleInputChange}
                    />

                    <label className={styles.label}>Estudiante:</label>
                    <select
                        className={styles.input}
                        name="id_student"
                        value={matriculaData.id_student}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Seleccione un estudiante</option>
                        {students.map((student) => (
                            <option key={student.id_student} value={student.id_student}>
                                {student.firstName} {student.lastName}
                            </option>
                        ))}
                    </select>

                    <label className={styles.label}>Carrera:</label>
                    <select
                        className={styles.input}
                        name="id_carrera"
                        value={matriculaData.id_carrera}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Seleccione una carrera</option>
                        {carreras.map((carrera) => (
                            <option key={carrera.id_carrera} value={carrera.id_carrera}>
                                {carrera.Name}
                            </option>
                        ))}
                    </select>

                    <button className={styles.button} type="submit">
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MatriculaForm;
