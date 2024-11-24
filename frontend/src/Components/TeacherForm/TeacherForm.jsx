import React, { useState, useEffect } from "react";
import useTeachersStore from "../../Store/TeachersStore";
import useCarreraStore from "../../Store/CarreraStore";
import useUserStore from "../../Store/UserStore";
import useRoleStore from "../../Store/RolesStore";
import style from "./TeacherForm.module.css";

const TeacherForm = () => {
    const { addTeacher } = useTeachersStore();
    const { fetchCarreras } = useCarreraStore();
    const { addUser } = useUserStore();
    const { fetchRoles } = useRoleStore();
    const [teacherData, setTeacherData] = useState({
        dni: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        id_carrera: "", // Carrera seleccionada
        id_rol: "",     // Rol seleccionado
        id_user: "",    // ID del usuario creado
        userName: "",   // Usuario
        password: "",   // Contraseña
    });

    const [carreras, setCarreras] = useState([]); // Carreras disponibles
    const [roles, setRoles] = useState([]);       // Roles disponibles

    useEffect(() => {
        // Cargar carreras y roles desde las store
        const getCarreras = async () => {
            await fetchCarreras();
            const storedCarreras = useCarreraStore.getState().carreras;
            setCarreras(storedCarreras);
        };
        getCarreras();

        const getRoles = async () => {
            await fetchRoles();
            const storedRoles = useRoleStore.getState().roles;
            setRoles(storedRoles);
        };
        getRoles();
    }, [fetchCarreras, fetchRoles]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTeacherData({
            ...teacherData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            userName: teacherData.userName,
            password: teacherData.password,
        };

        try {
            // Crear usuario
            const createdUser = await addUser(newUser);
            if (!createdUser || !createdUser.id_user) {
                throw new Error("User ID is missing from the response");
            }

            // Asociar el ID del usuario con el profesor
            const newTeacher = {
                ...teacherData,
                id_user: createdUser.id_user, // Asociar ID de usuario
            };

            // Agregar profesor
            await addTeacher(newTeacher);

            // Limpiar formulario después de guardar
            setTeacherData({
                dni: "",
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                id_carrera: "",
                id_rol: "",
                id_user: "",
                userName: "",
                password: "",
            });

            alert("Teacher and user added successfully!");
        } catch (error) {
            console.error("Error adding teacher and user", error.message);
            alert("There was an error adding the teacher and user.");
        }
    };

    return (
        <div className={style.formContainer}>
            <a href="/teacher_list">Go to Teacher List</a>
            <div className={style.formContent}>
                <h1 className={style.title}>Teacher Form</h1>
                <form onSubmit={handleSubmit}>
                    <label className={style.label}>DNI:</label>
                    <input
                        className={style.input}
                        type="text"
                        placeholder="Enter DNI"
                        required
                        name="dni"
                        value={teacherData.dni}
                        onChange={handleInputChange}
                    />
                    <label className={style.label}>First Name:</label>
                    <input
                        className={style.input}
                        type="text"
                        placeholder="Enter First Name"
                        required
                        name="firstName"
                        value={teacherData.firstName}
                        onChange={handleInputChange}
                    />
                    <label className={style.label}>Last Name:</label>
                    <input
                        className={style.input}
                        type="text"
                        placeholder="Enter Last Name"
                        required
                        name="lastName"
                        value={teacherData.lastName}
                        onChange={handleInputChange}
                    />
                    <label className={style.label}>Email:</label>
                    <input
                        className={style.input}
                        type="email"
                        placeholder="Enter Email"
                        required
                        name="email"
                        value={teacherData.email}
                        onChange={handleInputChange}
                    />
                    <label className={style.label}>Phone:</label>
                    <input
                        className={style.input}
                        type="text"
                        placeholder="Enter Phone"
                        required
                        name="phone"
                        value={teacherData.phone}
                        onChange={handleInputChange}
                    />
                    <label className={style.label}>Carrera:</label>
                    <select
                        className={style.input}
                        name="id_carrera"
                        value={teacherData.id_carrera}
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

                    <label className={style.label}>Role:</label>
                    <select
                        className={style.input}
                        name="id_rol"
                        value={teacherData.id_rol}
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

                    <label className={style.label}>Username:</label>
                    <input
                        className={style.input}
                        type="text"
                        placeholder="Enter username"
                        required
                        name="userName"
                        value={teacherData.userName}
                        onChange={handleInputChange}
                    />
                    <label className={style.label}>Password:</label>
                    <input
                        className={style.input}
                        type="password"
                        placeholder="Enter password"
                        required
                        name="password"
                        value={teacherData.password}
                        onChange={handleInputChange}
                    />
                    <button className={style.button} type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default TeacherForm;
