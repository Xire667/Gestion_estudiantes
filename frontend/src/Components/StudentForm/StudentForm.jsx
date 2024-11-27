import { useState, useEffect } from "react";
import styles from "./StudentForm.module.css";
import useStudentStore from "../../Store/StudentStore";
import useCarreraStore from "../../Store/CarreraStore";
import useUserStore from "../../Store/UserStore";
import useRoleStore from "../../Store/RolesStore"; // Asegúrate de tener un store para los roles
import useCicloStore from "../../Store/CicloStore";
import { useNavigate } from "react-router-dom";


const StudentForm = () => {
    const navigate = useNavigate();
    const { addStudent } = useStudentStore();
    const { fetchCarreras } = useCarreraStore();
    const { addUser } = useUserStore();
    const { fetchRoles } = useRoleStore(); // Cargar roles desde el store
    const { fetchCiclos } = useCicloStore(); // Cargar roles desde el store
    const [studentData, setStudentData] = useState({
        dni: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        id_carrera: "", // Para asociar la carrera
        id_user: "",    // Para asociar el id del usuario al estudiante
        id_rol: "2",    // Establecer el rol de estudiante por defecto
        userName: "",   // Campo para el usuario
        password: "",   // Campo para la contraseña
        id_ciclo: ""
    });

    const [carreras, setCarreras] = useState([]); // Estado para almacenar las carreras disponibles
    const [roles, setRoles] = useState([]); // Estado para almacenar los roles disponibles
    const [ciclos, setCiclos] = useState([]); // Estado para almacenar los roles disponibles

    useEffect(() => {
        const getCarreras = async () => {
            await fetchCarreras();
            const storedCarreras = useCarreraStore.getState().carreras;
            console.log('Fetched Carreras:', storedCarreras); // Agrega este log
            setCarreras(storedCarreras);
        };
        getCarreras();
    
        const getRoles = async () => {
            await fetchRoles();
            const storedRoles = useRoleStore.getState().roles;
            console.log('Fetched Roles:', storedRoles); // Agrega este log
            setRoles(storedRoles);
        };
        getRoles();
    
        const getCiclos = async () => {
            await fetchCiclos();
            const storedCiclos = useCicloStore.getState().ciclos;
            console.log('Fetched Ciclos:', storedCiclos); // Agrega este log
            setCiclos(storedCiclos);
        }; 
        getCiclos();
    }, [fetchCarreras, fetchRoles, fetchCiclos]); // Se ejecuta cada vez que cambian los datos de la store

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudentData({
            ...studentData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            userName: studentData.userName,
            password: studentData.password,
        };

        try {
            // Crear el usuario y esperar la respuesta
            const createdUser = await addUser(newUser);

            // Verifica que createdUser tenga la propiedad id_user
            if (!createdUser || !createdUser.id_user) {
                throw new Error("User ID is missing from the response");
            }

            // Asociar el id_user con el estudiante
            const newStudent = {
                ...studentData,
                id_user: createdUser.id_user, // Asignar el id del usuario
            };

            // Luego, agregar el estudiante con el id_user
            await addStudent(newStudent);

            // Resetear los campos después de guardar
            setStudentData({
                dni: "",
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                id_carrera: "", // Resetear id_carrera
                id_user: "",    // Resetear id_user
                id_rol: "2",    // Resetear id_rol y establecer de nuevo el valor por defecto
                userName: "",   // Resetear usuario
                password: "",   // Resetear contraseña
                id_ciclo: ""
            });

            alert("Student and user added successfully!");
        } catch (error) {
            console.error("Error adding student and user", error.message);
            alert("There was an error adding the student and user.");
        }
    };

    return (
        <div className={styles.formContainer}><button className={styles.backButton} onClick={() => navigate(-1)}>
        Volver
    </button>
            <div className={styles.formContent}>
                <h1 className={styles.title}>Student Form</h1>
                <form onSubmit={handleSubmit}>
                    <label className={styles.label}>DNI:</label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Enter DNI"
                        required
                        name="dni"
                        value={studentData.dni}
                        onChange={handleInputChange}
                    />
                    <label className={styles.label}>First Name:</label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Enter first name"
                        required
                        name="firstName"
                        value={studentData.firstName}
                        onChange={handleInputChange}
                    />
                    <label className={styles.label}>Last Name:</label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Enter last name"
                        required
                        name="lastName"
                        value={studentData.lastName}
                        onChange={handleInputChange}
                    />
                    <label className={styles.label}>Email:</label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Enter email"
                        required
                        name="email"
                        value={studentData.email}
                        onChange={handleInputChange}
                    />
                    <label className={styles.label}>Phone:</label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Enter phone"
                        required
                        name="phone"
                        value={studentData.phone}
                        onChange={handleInputChange}
                    />
                    <label className={styles.label}>Carrera:</label>
                    <select
                        className={styles.input}
                        name="id_carrera"
                        value={studentData.id_carrera}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select a career</option>
                        {carreras.map((carrera) => (
                            <option key={carrera.id_carrera} value={carrera.id_carrera}>
                                {carrera.Name}
                            </option>
                        ))}
                    </select>

                    <label className={styles.label}>Ciclos:</label>
                    <select
                        className={styles.input}
                        name="id_ciclo"
                        value={studentData.id_ciclo}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select a cicle</option>
                        {ciclos.map((ciclo) => (
                            <option key={ciclo.id_ciclo} value={ciclo.id_ciclo}>
                                {ciclo.ciclo}
                            </option>
                        ))}
                    </select>

                    <label className={styles.label}>Role:</label>
                    <select
                        className={styles.input}
                        name="id_rol"
                        value={studentData.id_rol}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select a role</option>
                        {roles.map((role) => (
                            <option key={role.id_rol} value={role.id_rol}>
                                {role.Name}
                            </option>
                        ))}
                    </select>

                    <label className={styles.label}>Username:</label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Enter username"
                        required
                        name="userName"
                        value={studentData.userName}
                        onChange={handleInputChange}
                    />
                    <label className={styles.label}>Password:</label>
                    <input
                        className={styles.input}
                        type="password"
                        placeholder="Enter password"
                        required
                        name="password"
                        value={studentData.password}
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

export default StudentForm;
