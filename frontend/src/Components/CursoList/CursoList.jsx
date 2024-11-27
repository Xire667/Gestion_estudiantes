import { useEffect, useState } from "react";
import useCursoStore from "../../Store/CursoStore";
import style from "./CursoList.module.css";
import { useNavigate } from "react-router-dom";

const CursosList = () => {
    const navigate = useNavigate();
    const { fetchCursos, cursos, deleteCurso, updateCurso } = useCursoStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCursos, setFilteredCursos] = useState([]);
    const [selectedCurso, setSelectedCurso] = useState(null);
    const [ciclos, setCiclos] = useState([]); // Aquí guardamos los ciclos disponibles
    const [selectedCiclo, setSelectedCiclo] = useState(""); // Para filtrar por ciclo

    useEffect(() => {
        fetchCursos();
        // Aquí obtienes los ciclos disponibles de la base de datos o del estado global
        // Supongo que ya tienes un estado o función para cargar los ciclos, sino puedes agregarlo
        // Aquí se debe configurar un estado similar para los ciclos, si ya lo tienes, usa `setCiclos`
        // Ejemplo:
        setCiclos([1, 2, 3, 4, 5, 6]); // Suponiendo que los ciclos son números
    }, []);

    useEffect(() => {
        // Filtrar cursos por nombre y ciclo (si se selecciona)
        setFilteredCursos(
            cursos.filter((curso) =>
                `${curso.Name}`.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (selectedCiclo ? curso.id_ciclo === parseInt(selectedCiclo) : true)
            )
        );
    }, [searchTerm, cursos, selectedCiclo]);

    const handleDelete = (id_curso) => {
        if (window.confirm("Are you sure?")) {
            deleteCurso(id_curso);
        }
    };

    const handleSelectCurso = (curso) => {
        setSelectedCurso(curso);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setSelectedCurso({
            ...selectedCurso,
            [name]: value
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateCurso(selectedCurso.id_curso, selectedCurso);
        setSelectedCurso(null);
    };

    const handleCloseEdit = () => {
        setSelectedCurso(null);
    };

    return (
        <div className={style.contenedorGeneral}>
            <button className={style.backButton} onClick={() => navigate(-1)}>
                        Volver
            </button>
            <h1>Cursos List</h1>

            {/* Filtro por ciclo */}
            <select
                className={style.input}
                value={selectedCiclo}
                onChange={(e) => setSelectedCiclo(e.target.value)}
            >
                <option value="">Select a cycle</option>
                {ciclos.map((ciclo) => (
                    <option key={ciclo} value={ciclo}>
                        {ciclo}
                    </option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Search curso..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={style.searchInput}
            />
            <div className={style.container}>
                {filteredCursos.map((curso) => (
                    <div key={curso.id_curso} className={style.listContainer}>
                        <h3>{curso.Name}</h3>
                        <p>{curso.description}</p>
                        <p>Ciclo: {curso.id_ciclo}</p> {/* Muestra el ciclo */}
                        <div className={style.buttonGroup}>
                            <button className={style.delete} onClick={() => handleDelete(curso.id_curso)}>❌</button>
                            <button className={style.edit} onClick={() => handleSelectCurso(curso)}>✍️</button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedCurso && (
                <div className={style.editContainer}>
                    <button className={style.closeButton} onClick={handleCloseEdit}>❌</button>
                    <h2>Edit Curso</h2>
                    <form onSubmit={handleEditSubmit}>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="Name"
                                value={selectedCurso.Name}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Description:
                            <input
                                type="text"
                                name="description"
                                value={selectedCurso.description}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Credits:
                            <input
                                type="text"
                                name="credits"
                                value={selectedCurso.credits}
                                onChange={handleEditChange}
                            />
                        </label>
                        {/* Seleccionar ciclo al editar */}
                        <label>
                            Cycle:
                            <select
                                name="id_ciclo"
                                value={selectedCurso.id_ciclo}
                                onChange={handleEditChange}
                            >
                                {ciclos.map((ciclo) => (
                                    <option key={ciclo} value={ciclo}>
                                        Cycle {ciclo}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <button type="submit">Save</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CursosList;
