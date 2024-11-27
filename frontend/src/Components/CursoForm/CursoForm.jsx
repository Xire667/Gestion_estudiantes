import { useState, useEffect } from "react";
import styles from "./CursoForm.module.css";
import useCursoStore from "../../Store/CursoStore";
import useCarreraStore from "../../Store/CarreraStore"; // Asegúrate de tener este store para obtener las carreras
import useCicloStore from "../../Store/CicloStore";

const CursoForm = () => {
    const { addCursos } = useCursoStore();
    const { fetchCarreras, carreras } = useCarreraStore();
    const { fetchCiclos, ciclos } = useCicloStore();
    
    const [CursoData, setCursoData] = useState({
        Name: "",
        description: "",
        credits: "",
        id_carrera: "", // Añadimos el campo para el ID de la carrera
        id_ciclo: ""
    });

    useEffect(() => {
        fetchCarreras();
    }, []);
    useEffect(() => {
        fetchCiclos();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCursoData({
            ...CursoData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addCursos(CursoData);
        setCursoData({
            Name: "",
            description: "",
            credits: "",
            id_carrera: "", // Reseteamos el campo
            id_ciclo: ""
        });
        alert("Curso added Successfully!");
    };

    return (
        <div className={styles.formContainer}>
            <a href="/home">IR a HOME</a>
            <h2></h2>
            <a href="/curso_list"></a>
            <div className={styles.formContent}>
                <h1 className={styles.title}>Curso Form</h1>
                <form onSubmit={handleSubmit}>
                    <label className={styles.label}>Nombre:</label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Enter Name"
                        required
                        name="Name"
                        value={CursoData.Name}
                        onChange={handleInputChange}
                    />
                    <label className={styles.label}>Description:</label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Enter description"
                        required
                        name="description"
                        value={CursoData.description}
                        onChange={handleInputChange}
                    />
                    <label className={styles.label}>Credits:</label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Enter credits"
                        required
                        name="credits"
                        value={CursoData.credits}
                        onChange={handleInputChange}
                    />
                    <label className={styles.label}>Carrera:</label>
                    <select
                        className={styles.select}
                        required
                        name="id_carrera"
                        value={CursoData.id_carrera}
                        onChange={handleInputChange}
                    >
                        <option value="" disabled>Select a Carrera</option>
                        {carreras.map((carrera) => (
                            <option key={carrera.id_carrera} value={carrera.id_carrera}>
                                {carrera.Name}
                            </option>
                        ))}
                    </select>
                    <select
                        className={styles.select}
                        required
                        name="id_ciclo"
                        value={CursoData.id_ciclo}
                        onChange={handleInputChange}
                    >
                        <option value="" disabled>Select a Cicle</option>
                        {ciclos.map((ciclo) => (
                            <option key={ciclo.id_ciclo} value={ciclo.id_ciclo}>
                                {ciclo.ciclo}
                            </option>
                        ))}
                    </select>
                    <button className={styles.button} type="submit">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CursoForm;
