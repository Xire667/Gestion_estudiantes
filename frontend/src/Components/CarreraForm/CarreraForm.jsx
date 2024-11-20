import { useState } from "react";
import styles from "./CarreraForm.module.css";
import useCarreraStore from "../../Store/CarreraStore"

const CarreraForm = () => {
    const {addCarrera} = useCarreraStore
    const [CarreraData, setCarreraData] = useState({
        Name: "",
        description: "",
        duration: ""
    });

    console.log(CarreraData)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCarreraData({
            ...CarreraData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addCarrera(CarreraData)
        setCarreraData({
            Name: "",
            description: "",
            duration: ""
        });
        alert("Carrera added Successfully!");
    };

    return (
        <div className={styles.formContainer}>
            <a href="/home">IR a HOME</a>
            <div className={styles.formContent}>
                <h1 className={styles.title}>Carrera Form</h1>
                <form onSubmit={handleSubmit}>
                    <label className={styles.label}>Nombre:</label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Enter Name"
                        required
                        name="Name"
                        value={CarreraData.Name}
                        onChange={handleInputChange}
                    />
                    <label className={styles.label}>Description:</label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Enter description"
                        required
                        name="description"
                        value={CarreraData.description}
                        onChange={handleInputChange}
                    />
                    <label className={styles.label}>Duration:</label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Enter duration"
                        required
                        name="duration"
                        value={CarreraData.duration}
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

export default CarreraForm;
