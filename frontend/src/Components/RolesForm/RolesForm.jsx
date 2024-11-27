import React, { useState, useEffect } from 'react';
import useRolesStore from '../../Store/RolesStore';
import style from './RolesForm.module.css'; // Asegúrate de que el archivo CSS cubra ambos componentes
import { useNavigate } from "react-router-dom";


const Roles = () => {
    const navigate = useNavigate();

    const { addRole, fetchRoles, roles, deleteRole, updateRole } = useRolesStore();
    const [RolData, setRolData] = useState({
        Name: '',
        description: '',
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredRoles, setFilteredRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    useEffect(() => {
        setFilteredRoles(
            roles.filter((role) =>
                `${role.Name}`.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, roles]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRolData({
            ...RolData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        addRole(RolData);
        setRolData({
            Name: '',
            description: ''
        });
        alert("Rol añadido con éxito");
    };

    const handleDelete = (id_rol) => {
        if (window.confirm("¿Estás seguro?")) {
            deleteRole(id_rol);
        }
    };

    const handleSelectRole = (role) => {
        setSelectedRole(role);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setSelectedRole({
            ...selectedRole,
            [name]: value
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateRole(selectedRole.id_rol, selectedRole);
        setSelectedRole(null);
    };

    const handleCloseEdit = () => {
        setSelectedRole(null);
    };

    return (
        <div className={style.container}>
            {/* Formulario de Rol */}
            <div className={style.formContainer}>
            <button className={style.backButton} onClick={() => navigate(-1)}>
                        Volver
                    </button>
                <div className={style.formContent}>
                    <h1 className={style.title}>Formulario de Rol</h1>
                    <form onSubmit={handleSubmit}>
                        <label className={style.label}>Nombre:</label>
                        <input
                            className={style.input}
                            type="text"
                            placeholder="Ingrese el nombre"
                            required
                            name="Name"
                            value={RolData.Name}
                            onChange={handleInputChange}
                        />
                        <label className={style.label}>Descripción:</label>
                        <input
                            className={style.input}
                            type="text"
                            placeholder="Ingrese la descripción"
                            required
                            name="description"
                            value={RolData.description}
                            onChange={handleInputChange}
                        />
                        <button className={style.button} type="submit">Guardar</button>
                    </form>
                </div>
            </div>

            {/* Listado de Roles */}
            <div className={style.listContainer}>
                <a href="/roles">Ver Roles</a>
                <h1>Listado de Roles</h1>
                <input
                    type="text"
                    placeholder="Buscar rol..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={style.searchInput}
                />
                <div className={style.roleList}>
                    {filteredRoles.map((role) => (
                        <div key={role.id_rol} className={style.roleItem}>
                            <h3>{role.Name}</h3>
                            <p>{role.description}</p>
                            <div className={style.buttonGroup}>
                                <button className={style.delete} onClick={() => handleDelete(role.id_rol)}>❌</button>
                                <button className={style.edit} onClick={() => handleSelectRole(role)}>✍️</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Edición de Rol */}
                {selectedRole && (
                    <div className={style.editContainer}>
                        <button className={style.closeButton} onClick={handleCloseEdit}>❌</button>
                        <h2>Editar Rol</h2>
                        <form onSubmit={handleEditSubmit}>
                            <label>
                                Nombre:
                                <input
                                    type="text"
                                    name="Name"
                                    value={selectedRole.Name}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Descripción:
                                <input
                                    type="text"
                                    name="description"
                                    value={selectedRole.description}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <button type="submit">Guardar</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Roles;
