import { useState } from "react"
import axios from "axios"
import useCarreraStore from "../../Store/CarreraStore"
import './CarreraForm.css'

const CarreraForm = () =>{
    const {addCarrera} = useCarreraStore()
    const [CarreraData, setCarreraData] = useState({
        Name:"",
        description:"",
        duration:""
    })

    console.log(CarreraData);

    const handleInputChange = (e)=>{
        const {name, value} = e.target;
        setCarreraData({
            ...CarreraData,
            [name]: value
        });
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        addCarrera(CarreraData)
        setCarreraData({
            Name:"",
            description:"",
            duration:""
        })
        alert("Carrera add Successfully")
    }

    return (
        <div className="form-container">
            <div className="form-content">
                <h1>Carrera Form</h1>
                <form onSubmit={handleSubmit}>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        required
                        name="Name"
                        value={CarreraData.Name}
                        onChange={handleInputChange}
                    />
                    <label>Description:</label>
                    <input
                        type="text"
                        placeholder="Enter description"
                        required
                        name="description"
                        value={CarreraData.description}
                        onChange={handleInputChange}
                    />
                    <label>Duration:</label>
                    <input
                        type="text"
                        placeholder="Enter duration"
                        required
                        name="duration"
                        value={CarreraData.duration}
                        onChange={handleInputChange}
                    />
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    )
}

export default CarreraForm