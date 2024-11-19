import { useEffect, useState } from "react";
import useCarreraStore from "../../Store/CarreraStore";
import style from "./CarreraList.module.css";

const CarreraList = () => {
    const { fetchCarreras, carreras, deleteCarrera, updateCarrera } = useCarreraStore();
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

    const handleCloseEdit = () =>{
        setSelectedCarrera(null);
    }

    return (
        <div className={style.contenedorGeneral}>
            <h1>Career List</h1>
            <input
                type="text"
                placeholder="Search career..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={style.searchInput}
            />
            <div className={style.container}>
                {filteredCarreras.map((user) => (
                    <div key={user.id} className={style.listContainer}>
                        <h3>{user.Name}</h3>
                        <p>{user.description}</p>
                        <p>{user.duration}</p>
                        <div className={style.buttonGroup}>
                            <button className={style.delete} onClick={() => handleDelete(user.id)}>❌</button>
                            <button className={style.edit} onClick={() => handleSelectCarrera(user)}>✍️</button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedCarrera && (
                <div className={style.editContainer}>
                    <button className={style.closeButton} onClick={handleCloseEdit}>❌</button>
                    <h2>Edit Career</h2>
                    <form onSubmit={handleEditSubmit}>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="Name"
                                value={selectedCarrera.Name}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Description:
                            <input
                                type="text"
                                name="description"
                                value={selectedCarrera.description}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Duration:
                            <input
                                type="text"
                                name="duration"
                                value={selectedCarrera.duration}
                                onChange={handleEditChange}
                            />
                        </label>
                        <button type="submit">Save</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default CarreraList;
