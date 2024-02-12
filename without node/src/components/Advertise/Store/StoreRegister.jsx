import React from 'react'
import { Stack, TextField } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import './Store_Register.css';

const StoreRegister = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        id: 0,
        storeName: '',
        storePhoneNumber: '',
        storeEmail: '',
        latitude: '',
        longitude: '',
        completeAddress: '',
        postalCode: '',
        googleMapLink: '',
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
        const username = 'bnb_api';
        const password = 'QSJNVBSNSBJHSTUHJSISIJSSEV';

        const basicAuth = 'Basic ' + btoa(username + ':' + password);

        fetch('https://bnb.care4edu.com/bnb/store', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': basicAuth
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem('storePhoneNumber', formData.storePhoneNumber)

                toast.success("Submitted successfully", {
                    position: 'top-right',
                })

                console.log('Success:', data);
                navigate('/StoreSpecialization')
            })
            .catch((error) => {
                toast.error("Error")
                // Handle errors
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <Stack>
                <h5 style={{ textAlign: 'center', color: 'black', margin: '20px' }}>STORE REGISTRATION</h5>

                <form className="register_form" onSubmit={handleSubmit}
                    style={{
                        marginTop: '2vh', // Adjust top margin for vertical centering
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
                    }}
                >
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                        <TextField
                            id="storeName"
                            label="Store Name"
                            required
                            margin="normal"
                            size="small"
                            value={formData.storeName}
                            autoFocus
                            onChange={handleInputChange}
                        />

                        <TextField
                            id="storePhoneNumber"
                            label="Phone Number"
                            required
                            margin="normal"
                            size="small"
                            value={formData.storePhoneNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <TextField
                        required
                        fullWidth
                        id="storeEmail"
                        label="Email"
                        margin="normal"
                        size="small"
                        value={formData.storeEmail}
                        onChange={handleInputChange}
                    />

                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                        <TextField
                            id="latitude"
                            label="Latitude"
                            required
                            margin="normal"
                            size="small"
                            value={formData.latitude}
                            onChange={handleInputChange}
                        />
                        <TextField
                            id="longitude"
                            label="Longitude"
                            required
                            margin="normal"
                            size="small"
                            value={formData.longitude}
                            onChange={handleInputChange}
                        />
                    </div>
                    <TextField
                        required
                        fullWidth
                        id="completeAddress"
                        label="Complete Address"
                        margin="normal"
                        size="small"
                        value={formData.completeAddress}
                        onChange={handleInputChange}
                    />
                    <TextField
                        id="googleMapLink"
                        label="Google Map Link"
                        required
                        fullWidth
                        margin="normal"
                        size="small"
                        value={formData.googleMapLink}
                        onChange={handleInputChange}
                    />

                    <button
                        type="submit"
                        // onClick={handleSubmit}
                        style={{
                            width: '100px',
                            height: '50px',
                            marginTop: '20px',
                            backgroundColor: '#0199FF',
                            color: 'black',
                            borderRadius: '8px',
                        }}
                    >
                        Submit
                    </button>
                </form>
            </Stack>
        </div>
    );
};

export default StoreRegister;