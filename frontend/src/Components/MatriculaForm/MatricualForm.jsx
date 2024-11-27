import { useState, useEffect } from "react";
import styles from "./MatriculaForm.module.css";
import useMatriculaStore from "../../Store/MatriculaStore";
import useCarreraStore from "../../Store/CarreraStore";
import useStudentStore from "../../Store/StudentStore";
import useCicloStore from "../../Store/CicloStore";

const MatriculaForm = () => {
    const { addMatricula } = useMatriculaStore();
    const { fetchCarreras } = useCarreraStore();
    const { fetchStudents } = useStudentStore();
    const { fetchCiclos } = useCicloStore();

    const [matriculaData, setMatriculaData] = useState({
        estado: "",
        description: "",
        id_student: "",
        id_carrera: "",
        id_ciclo: "",
    });

    const [carreras, setCarreras] = useState([]);
    const [students, setStudents] = useState([]);
    const [ciclos, setCiclos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchCarreras();
                const storedCarreras = useCarreraStore.getState().carreras;
                setCarreras(storedCarreras);

                await fetchStudents();
                const storedStudents = useStudentStore.getState().students;
                setStudents(storedStudents);

                await fetchCiclos();
                const storedCiclos = useCicloStore.getState().ciclos;
                setCiclos(storedCiclos);
            } catch (error) {
                console.error("Error fetching data:", error);
                alert("Error fetching data. Please try again later.");
            }
        };

        fetchData();
    }, [fetchCarreras, fetchStudents, fetchCiclos]);

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
            const newMatricula = {
                estado: matriculaData.estado,
                description: matriculaData.description,
                id_student: matriculaData.id_student,
                id_carrera: matriculaData.id_carrera,
                id_ciclo: matriculaData.id_ciclo,
            };

            const createdMatricula = await addMatricula(newMatricula);

            // Verifica si la matrícula fue creada
            if (!createdMatricula || !createdMatricula.id_matricula) {
                throw new Error("Error al crear la matrícula");
            }

            setMatriculaData({
                estado: "",
                description: "",
                id_student: "",
                id_carrera: "",
                id_ciclo: "",
            });

            alert("Matrícula creada con éxito!");
        } catch (error) {
            console.error("Error al crear matrícula", error.message);
            alert("Hubo un error al crear la matrícula. Por favor, inténtelo de nuevo.");
        }
    };

    return (
        <div className={styles.formContainer}>
            <a href="/home">IR a HOME</a>
            <div className={styles.formContent}>
                <h1 className={styles.title}>Formulario de Matrícula</h1>
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

                    <label className={styles.label}>Ciclo:</label>
                    <select
                        className={styles.input}
                        name="id_ciclo"
                        value={matriculaData.id_ciclo}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Seleccione un ciclo</option>
                        {ciclos.map((ciclo) => (
                            <option key={ciclo.id_ciclo} value={ciclo.id_ciclo}>
                                {ciclo.ciclo}
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
