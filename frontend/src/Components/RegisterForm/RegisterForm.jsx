import { useState } from "react";
import styles from "./RegisterForm.module.css";
import useUserStore from "../../Store/UserStore"

const RegisterForm = () => {
    const {addRegister} = useUserStore
    const [RegisterData, setRegisterData] = useState({
        Name: "",
        description: "",
        duration: ""
    });

    console.log(RegisterData)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({
            ...RegisterData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addRegister(RegisterData)
        setRegisterData({
            Name: "",
            description: "",
            duration: ""
        });
        alert("Register added Successfully!");
    };

    return (
        <div className={styles.formContainer}>
            <a href="/home">IR a HOME</a>
            <div className={styles.formContent}>
                <h1 className={styles.title}>Register Form</h1>
                <form onSubmit={handleSubmit}>
                    <label className={styles.label}>User:</label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Enter Name"
                        required
                        name="userName"
                        value={RegisterData.userName}
                        onChange={handleInputChange}
                    />
                    <label className={styles.label}>Password:</label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Enter description"
                        required
                        name="password"
                        value={RegisterData.password}
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

export default RegisterForm;
