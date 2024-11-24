import { useEffect, useState } from "react";
import useTeachersStore from "../../Store/TeachersStore";  // Suponiendo que tengas un store similar para Teachers
import style from "./TeachersList.module.css";

const TeachersList = () => {
    const { fetchTeachers, teachers, deleteTeacher, updateTeacher } = useTeachersStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    useEffect(() => {
        fetchTeachers();
    }, []);

    useEffect(() => {
        setFilteredTeachers(
            teachers.filter((teacher) =>
                `${teacher.firstName} ${teacher.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, teachers]);

    const handleDelete = (id_teacher) => {
        if (window.confirm("Are you sure?")) {
            deleteTeacher(id_teacher);
        }
    };

    const handleSelectTeacher = (teacher) => {
        setSelectedTeacher(teacher);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setSelectedTeacher({
            ...selectedTeacher,
            [name]: value
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateTeacher(selectedTeacher.id_teacher, selectedTeacher);
        setSelectedTeacher(null);
    };

    const handleCloseEdit = () => {
        setSelectedTeacher(null);
    };

    return (
        <div className={style.contenedorGeneral}>
            <a href="/home">Ir a Home</a>
            <h1></h1>
            <a href="/teacher">Teachers</a>
            <h1>Teachers List</h1>
            <input
                type="text"
                placeholder="Search teacher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={style.searchInput}
            />
            <div className={style.container}>
                {filteredTeachers.map((teacher) => (
                    <div key={teacher.id_teacher} className={style.listContainer}>
                        <h3>{teacher.firstName} {teacher.lastName}</h3>
                        <p>Email: {teacher.email}</p>
                        <p>Phone: {teacher.phone}</p>
                        <div className={style.buttonGroup}>
                            <button className={style.delete} onClick={() => handleDelete(teacher.id_teacher)}>❌</button>
                            <button className={style.edit} onClick={() => handleSelectTeacher(teacher)}>✍️</button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedTeacher && (
                <div className={style.editContainer}>
                    <button className={style.closeButton} onClick={handleCloseEdit}>❌</button>
                    <h2>Edit Teacher</h2>
                    <form onSubmit={handleEditSubmit}>
                        <label>
                            First Name:
                            <input
                                type="text"
                                name="firstName"
                                value={selectedTeacher.firstName}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Last Name:
                            <input
                                type="text"
                                name="lastName"
                                value={selectedTeacher.lastName}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={selectedTeacher.email}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Phone:
                            <input
                                type="text"
                                name="phone"
                                value={selectedTeacher.phone}
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

export default TeachersList;
