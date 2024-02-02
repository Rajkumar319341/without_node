import { TextField } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const StoreSpecialization = () => {

    const strorePhone = localStorage.getItem('storePhoneNumber')
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        id: 0,
        phone: strorePhone,
        specializationName: '',
        specializationDescription: '',
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };
    const handleSubmit = (e) => {

        e.preventDefault();
        console.log(formData);
        console.log(`strorePhone${strorePhone}`);
        const username = 'bnb_api';
        const password = 'QSJNVBSNSBJHSTUHJSISIJSSEV';

        const basicAuth = 'Basic ' + btoa(username + ':' + password);
        e.preventDefault();
        fetch('https://bnb.care4edu.com/bnb/stores/specialization', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': basicAuth
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem('specializationDescription', formData.specializationDescription)
                console.log('Success:', data);
                navigate('/Storecategory')
            })
            .catch((error) => {
                // Handle errors
                console.error('Error:', error);
            });
    };
    return (
        <div style={{ marginTop: "50px", marginBottom: "50px" }}>

            <h2 style={{ textAlign: "center" }}>Your Specialization</h2>
            <form 
            onSubmit={handleSubmit}
            style={{ marginTop: '2vh', // Adjust top margin for vertical centering
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: '8px',
                        boxShadow: '0px 10px 10px',
                        padding: '20px', // Adjust padding for spacing
                        backgroundColor: 'white',
                        border: '5px solid #ccc',
                        width: '400px',
                        margin: '0 auto', 
                       }} >

                <TextField id="specializationName"
                    fullWidth
                    label="Specialization Name"
                    helperText="Tailors"
                    required value={formData.specializationName}
                    onChange={handleInputChange} />
                <TextField id="specializationDescription"
                    fullWidth
                    label="Specialization Description"
                    helperText="Special design"
                    required
                    value={formData.specializationDescription}
                    onChange={handleInputChange} />
                <button type="submit"  style={{ width: "100px", height: "50px", marginTop: "20px", backgroundColor: "#0199FF", color: "black",borderRadius:"8px" }}>Submit</button>
            </form>

        </div>
    )
}

export default StoreSpecialization