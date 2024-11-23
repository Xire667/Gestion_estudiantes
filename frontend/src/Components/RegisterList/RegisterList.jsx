import { useEffect, useState } from "react";
import useUserStore from "../../Store/UserStore";
import style from "./RegisterList.module.css";

const RegisterList = () => {
    const { fetchUsers, users, deleteUser, updateUser } = useUserStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredRegister, setFilteredRegister] = useState([]);
    const [selectedRegister, setSelectedRegister] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        setFilteredRegister(
            users.filter((user) =>
                `${user.Name}`.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, users]);

    const handleDelete = (id_user) => {
        if (window.confirm("Are you sure?")) {
            deleteUser(id_user);
        }
    };

    const handleSelectRegister = (user) => {
        setSelectedRegister(user);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setSelectedRegister({
            ...selectedRegister,
            [name]: value
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateUser(selectedRegister.id_user, selectedRegister);
        setSelectedRegister(null);
    };

    const handleCloseEdit = () => {
        setSelectedRegister(null);
    };

    return (
        <div className={style.contenedorGeneral}>
            <a href="/home">Ir a Home</a>
            <h1></h1>
            <a href="/register">registers</a>
            <h1>Register List</h1>
            <input
                type="text"
                placeholder="Search register..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={style.searchInput}
            />
            <div className={style.container}>
                {filteredRegister.map((user) => (
                    <div key={user.id_user} className={style.listContainer}>
                        <h3>{user.userName}</h3>
                        <p>{user.password}</p>
                        <div className={style.buttonGroup}>
                            <button className={style.delete} onClick={() => handleDelete(user.id_user)}>❌</button>
                            <button className={style.edit} onClick={() => handleSelectRegister(user)}>✍️</button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedRegister && (
                <div className={style.editContainer}>
                    <button className={style.closeButton} onClick={handleCloseEdit}>❌</button>
                    <h2>Edit Register</h2>
                    <form onSubmit={handleEditSubmit}>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="userName"
                                value={selectedRegister.userName}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Description:
                            <input
                                type="text"
                                name="password"
                                value={selectedRegister.password}
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

export default RegisterList;
