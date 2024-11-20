import { useEffect, useState } from "react";
import useRolesStore from "../../Store/RolesStore";
import style from "./RolesList.module.css";

const RolesList = () => {
    const { fetchRoles, roles, deleteRole, updateRole } = useRolesStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredRoles, setFilteredRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);

    useEffect(() => {
        fetchRoles();
    }, []);

    useEffect(() => {
        setFilteredRoles(
            roles.filter((role) =>
                `${role.Name}`.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, roles]);

    const handleDelete = (id_rol) => {
        if (window.confirm("Are you sure?")) {
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
        <div className={style.contenedorGeneral}>
            <a href="/home">Ir a Home</a>
            <h1></h1>
            <a href="/roles">roles</a>
            <h1>Roles List</h1>
            <input
                type="text"
                placeholder="Search role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={style.searchInput}
            />
            <div className={style.container}>
                {filteredRoles.map((role) => (
                    <div key={role.id_rol} className={style.listContainer}>
                        <h3>{role.Name}</h3>
                        <p>{role.description}</p>
                        <div className={style.buttonGroup}>
                            <button className={style.delete} onClick={() => handleDelete(role.id_rol)}>❌</button>
                            <button className={style.edit} onClick={() => handleSelectRole(role)}>✍️</button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedRole && (
                <div className={style.editContainer}>
                    <button className={style.closeButton} onClick={handleCloseEdit}>❌</button>
                    <h2>Edit Role</h2>
                    <form onSubmit={handleEditSubmit}>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="Name"
                                value={selectedRole.Name}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Description:
                            <input
                                type="text"
                                name="description"
                                value={selectedRole.description}
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

export default RolesList;
