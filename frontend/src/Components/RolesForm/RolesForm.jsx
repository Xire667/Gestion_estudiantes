import React, { useState, useEffect } from 'react';
import useRolesStore from '../../Store/RolesStore';
import axios from "axios"
import style from './RolesForm.module.css'

const RolesForm = () => {
    const { addRole} = useRolesStore();
    const [RolData, setRolData] = useState({
        Name: '',
        description: '',
    });

    console.log(RolData)

    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setRolData({
            ...RolData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        addRole(RolData)
        setRolData({
            Name: '',
            description: ''
        })
        alert("Rol add Successfully")
    };

    return (
        <div className={style.formContainer}>
            <a href="/roles_list">Ir a roles list</a>
            <div className={style.formContent}>
                <h1 className={style.title} >Rol Form</h1>
                <form onSubmit={handleSubmit}>
                    <label className={style.label} >Nombre:</label>
                    <input
                        className={style.input}
                        type="text"
                        placeholder="Enter Name"
                        required
                        name="Name"
                        value={RolData.Name}
                        onChange={handleInputChange}
                    />
                    <label className={style.label}>Description:</label>
                    <input
                        className={style.input}
                        type="text"
                        placeholder="Enter description"
                        required
                        name="description"
                        value={RolData.description}
                        onChange={handleInputChange}
                    />
                    <button className={style.button} type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default RolesForm;
