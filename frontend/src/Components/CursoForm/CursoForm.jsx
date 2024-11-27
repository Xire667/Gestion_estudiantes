import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CursoForm.module.css";
import useCursoStore from "../../Store/CursoStore";
import useCarreraStore from "../../Store/CarreraStore";
import useCicloStore from "../../Store/CicloStore";

const CursoForm = () => {
  const navigate = useNavigate();

  // Stores
  const { addCursos } = useCursoStore();
  const { fetchCarreras, carreras } = useCarreraStore();
  const { fetchCiclos, ciclos } = useCicloStore();

  // State for form data
  const [cursoData, setCursoData] = useState({
    Name: "",
    description: "",
    credits: "",
    id_carrera: "",
    id_ciclo: "",
  });

  // Fetch options for selects
  useEffect(() => {
    fetchCarreras();
    fetchCiclos();
  }, []);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCursoData({
      ...cursoData,
      [name]: value,
    });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    addCursos(cursoData);
    setCursoData({
      Name: "",
      description: "",
      credits: "",
      id_carrera: "",
      id_ciclo: "",
    });
    alert("Curso added successfully!");
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formContent}>
        <h1 className={styles.title}>Curso Form</h1>
        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <label className={styles.label}>Nombre:</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Enter Name"
            required
            name="Name"
            value={cursoData.Name}
            onChange={handleInputChange}
          />

          {/* Descripción */}
          <label className={styles.label}>Descripción:</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Enter description"
            required
            name="description"
            value={cursoData.description}
            onChange={handleInputChange}
          />

          {/* Créditos */}
          <label className={styles.label}>Créditos:</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Enter credits"
            required
            name="credits"
            value={cursoData.credits}
            onChange={handleInputChange}
          />

          {/* Carrera */}
          <label className={styles.label}>Carrera:</label>
          <select
            className={styles.select}
            required
            name="id_carrera"
            value={cursoData.id_carrera}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select a Carrera
            </option>
            {carreras.map((carrera) => (
              <option key={carrera.id_carrera} value={carrera.id_carrera}>
                {carrera.Name}
              </option>
            ))}
          </select>

          {/* Ciclo */}
          <label className={styles.label}>Ciclo:</label>
          <select
            className={styles.select}
            required
            name="id_ciclo"
            value={cursoData.id_ciclo}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select a Cicle
            </option>
            {ciclos.map((ciclo) => (
              <option key={ciclo.id_ciclo} value={ciclo.id_ciclo}>
                {ciclo.ciclo}
              </option>
            ))}
          </select>

          {/* Botón de guardar */}
          <button className={styles.button} type="submit">
            Save
          </button>
          <button className={styles.backButton} onClick={() => navigate(-1)}>
        Volver
      </button>
        </form>
      </div>
    </div>
  );
};

export default CursoForm;
