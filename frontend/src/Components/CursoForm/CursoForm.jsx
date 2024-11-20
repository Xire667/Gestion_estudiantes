import { useState } from "react";
import styles from "./CursoForm.module.css";
import useCursoStore from "../../Store/CursoStore"

const CursoForm = () => {
    const {addCurso} = useCursoStore
    const [CursoData, setCursoData] = useState({
        Name: "",
        description: "",
        credits:""
    });

    console.log(CursoData)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCursoData({
            ...CursoData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addCurso(CursoData)
        setCursoData({
            Name: "",
            description: "",
            credits: ""
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
                        placeholder="Enter duration"
                        required
                        name="duration"
                        value={CursoData.credits}
                        onChange={handleInputChange}
                    />
                    <button className={styles.button} type="submit">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CursoForm;
