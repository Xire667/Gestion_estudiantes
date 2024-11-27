import { useEffect, useState } from "react";
import useCarreraStore from "../../Store/CarreraStore";
import style from "./CarreraList.module.css";
import { useNavigate } from "react-router-dom";


const CarreraList = () => {
    const navigate = useNavigate();
    const { fetchCarreras, carreras } = useCarreraStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCarreras, setFilteredCarreras] = useState([]);

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

    return (
        <div className={style.contenedorGeneral}>
            <button className={style.backButton} onClick={() => navigate(-1)}>
                Volver
            </button>
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
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CarreraList;
