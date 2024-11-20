import { useEffect, useState } from "react";
import useCursoStore from "../../Store/CursoStore";
import style from "./CursoList.module.css";

const CursosList = () => {
    const { fetchCursos, cursos, deleteCurso, updateCurso } = useCursoStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCursos, setFilteredCursos] = useState([]);
    const [selectedCurso, setSelectedCurso] = useState(null);

    useEffect(() => {
        fetchCursos();
    }, []);

    useEffect(() => {
        setFilteredCursos(
            cursos.filter((curso) =>
                `${curso.Name}`.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, cursos]);

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
            <a href="/home">Ir a Home</a>
            <h1></h1>
            <a href="/curso">Ir a cursos</a>
            <h1>Cursos List</h1>
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
                        <button type="submit">Save</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CursosList;
