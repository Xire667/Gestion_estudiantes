import { useEffect, useState } from "react";
import useCursoStore from "../../Store/CursoStore";
import style from "./CursoListStu.module.css";
import { useNavigate } from "react-router-dom";


const CursosListStu = () => {
    
    const navigate = useNavigate();
    const { fetchCursos, cursos } = useCursoStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCursos, setFilteredCursos] = useState([]);
    const [ciclos, setCiclos] = useState([]); // Guardar ciclos disponibles
    const [selectedCiclo, setSelectedCiclo] = useState(""); // Para filtrar por ciclo

    useEffect(() => {
        fetchCursos();
        setCiclos([1, 2, 3, 4, 5, 6]); // Supuesto ejemplo de ciclos
    }, []);

    useEffect(() => {
        setFilteredCursos(
            cursos.filter((curso) =>
                `${curso.Name}`.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (selectedCiclo ? curso.id_ciclo === parseInt(selectedCiclo) : true)
            )
        );
    }, [searchTerm, cursos, selectedCiclo]);

    return (
        <div className={style.contenedorGeneral}>
            <button className={style.backButton} onClick={() => navigate(-1)}>Volver</button>
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
                        Cycle {ciclo}
                    </option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Search course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={style.searchInput}
            />

            <div className={style.container}>
                {filteredCursos.map((curso) => (
                    <div key={curso.id_curso} className={style.listContainer}>
                        <h3>{curso.Name}</h3>
                        <p>{curso.description}</p>
                        <p>Ciclo: {curso.id_ciclo}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CursosListStu;
