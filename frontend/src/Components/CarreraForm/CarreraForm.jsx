import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCarreraStore from "../../Store/CarreraStore";
import styles from "./CarreraForm.module.css";

const CarreraForm = () => {
    const navigate = useNavigate();
    const { addCarrera, fetchCarreras, carreras, deleteCarrera, updateCarrera } = useCarreraStore();
    const [CarreraData, setCarreraData] = useState({
        Name: "",
        description: "",
        duration: ""
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCarreras, setFilteredCarreras] = useState([]);
    const [selectedCarrera, setSelectedCarrera] = useState(null);

    useEffect(() => {
        fetchCarreras();
    }, []);

    useEffect(() => {
        setFilteredCarreras(
            carreras.filter((carrera) =>
                `${carrera.Name}`.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, carreras]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCarreraData({
            ...CarreraData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addCarrera(CarreraData);
        setCarreraData({
            Name: "",
            description: "",
            duration: ""
        });
        alert("Carrera added Successfully!");
    };

    const handleDelete = (id_carrera) => {
        if (window.confirm("Are you sure?")) {
            deleteCarrera(id_carrera);
        }
    };

    const handleSelectCarrera = (carrera) => {
        setSelectedCarrera(carrera);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setSelectedCarrera({
            ...selectedCarrera,
            [name]: value
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateCarrera(selectedCarrera.id_carrera, selectedCarrera);
        setSelectedCarrera(null);
    };

    const handleCloseEdit = () => {
        setSelectedCarrera(null);
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
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
                    <button className={styles.backButton} onClick={() => navigate(-1)}>
                        Volver
                    </button>
                </div>
            </div>

            <div className={styles.listContainer}>
                <h1>Career List</h1>
                <input
                    type="text"
                    placeholder="Search career..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <div className={styles.carreraList}>
                    {filteredCarreras.map((user) => (
                        <div key={user.id} className={styles.listItem}>
                            <h3>Nombre: {user.Name}</h3>
                            <p>Descripcion: {user.description}</p>
                            <p>Duracion: {user.duration}</p>
                            <div className={styles.buttonGroup}>
                                <button className={styles.delete} onClick={() => handleDelete(user.id)}>❌</button>
                                <button className={styles.edit} onClick={() => handleSelectCarrera(user)}>✍️</button>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedCarrera && (
                    <div className={styles.editContainer}>
                        <button className={styles.closeButton} onClick={handleCloseEdit}>❌</button>
                        <h2>Edit Career</h2>
                        <form onSubmit={handleEditSubmit}>
                            <label className={styles.label}>
                                Name:
                                <input
                                    className={styles.input}
                                    type="text"
                                    name="Name"
                                    value={selectedCarrera.Name}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label className={styles.label}>
                                Description:
                                <input
                                    className={styles.input}
                                    type="text"
                                    name="description"
                                    value={selectedCarrera.description}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label className={styles.label}>
                                Duration:
                                <input
                                    className={styles.input}
                                    type="text"
                                    name="duration"
                                    value={selectedCarrera.duration}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <button className={styles.button} type="submit">Save</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CarreraForm;
