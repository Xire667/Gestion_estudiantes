import { useEffect, useState } from "react";
import useStudentStore from "../../Store/StudentStore";
import style from "./StudentList.module.css";

const StudentList = () => {
    const { fetchStudents, students, deleteStudent, updateStudent } = useStudentStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    useEffect(() => {
        setFilteredStudents(
            students.filter((student) =>
                `${student.firstName}`.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, students]);

    const handleDelete = (id_student) => {
        if (window.confirm("Are you sure?")) {
            deleteStudent(id_student);
        }
    };

    const handleSelectStudent = (student) => {
        setSelectedStudent(student);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setSelectedStudent({
            ...selectedStudent,
            [name]: value
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateStudent(selectedStudent.id_student, selectedStudent);
        setSelectedStudent(null);
    };

    const handleCloseEdit = () =>{
        setSelectedStudent(null);
    }

    return (
        <div className={style.contenedorGeneral}>
            <a href="/student">Ir a Student Form</a>
            <h1>Student List</h1>
            <input
                type="text"
                placeholder="Search student..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={style.searchInput}
            />
            <div className={style.container}>
                {filteredStudents.map((user) => (
                    <div key={user.id} className={style.listContainer}>
                        DNI:
                        <h3>{user.dni}</h3>
                        FirstName:
                        <h3>{user.firstName}</h3>
                        LastName:
                        <h3>{user.lastName}</h3>
                        Email:
                        <h3>{user.email}</h3>
                        Phone:
                        <h3>{user.phone}</h3>
                        <div className={style.buttonGroup}>
                            <button className={style.delete} onClick={() => handleDelete(user.id)}>❌</button>
                            <button className={style.edit} onClick={() => handleSelectStudent(user)}>✍️</button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedStudent && (
                <div className={style.editContainer}>
                    <button className={style.closeButton} onClick={handleCloseEdit}>❌</button>
                    <h2>Edit Students</h2>
                    <form onSubmit={handleEditSubmit}>
                        <label>
                            DNI:
                            <input
                                type="text"
                                name="dni"
                                value={selectedStudent.dni}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            FirstName:
                            <input
                                type="text"
                                name="firstName"
                                value={selectedStudent.firstName}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            LastName:
                            <input
                                type="text"
                                name="lastName"
                                value={selectedStudent.lastName}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="text"
                                name="email"
                                value={selectedStudent.email}
                                onChange={handleEditChange}
                            />
                        </label>
                        <label>
                            Phone:
                            <input
                                type="text"
                                name="phone"
                                value={selectedStudent.phone}
                                onChange={handleEditChange}
                            />
                        </label>
                        <button type="submit">Save</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default StudentList;
