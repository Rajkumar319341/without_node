import { Stack, TextField, Typography, MenuItem, Button, } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import Select from 'react-select';
import './StoreProduct.css';


const StoreProduct = () => {
    const navigate = useNavigate();
    const [brandValues, setBrandValues] = useState([""]);
    const [materialValues, setMaterialValues] = useState([""]);

    const addBrandValue = () => {
        setBrandValues([...brandValues, ""]);
    };

    const addMaterialValue = () => {
        setMaterialValues([...materialValues, ""]);
    };
    const [formData, setFormData] = useState({
        id: 0,
        store_phone_number: '',
        product_name: '',
        product_description: '',
        gender: [""],
        categories: '',
        size: [""],
        price: '',
        brand: [""],
        discount: '',
        material: [""],
        product_count: '',
        warranty: "",
        warranty_duration: "",
        created_date: "",
        updated_date: "",
        image_ids: [""]
    });
    

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleListChange = (listName, selectedOptions) => {
        setFormData((prevData) => {
            const updatedList = selectedOptions.map((option) => option.value);
            return {
                ...prevData,
                [listName]: updatedList,
            };
        });
    };


    const handleAddItem = (e, index, listName) => {
        const newValue = e.target.value;

        if (listName === 'brand') {
            setBrandValues((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues[index] = newValue;
                return updatedValues;
            });
        } else if (listName === 'material') {
            setMaterialValues((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues[index] = newValue;
                return updatedValues;
            });
        }
    };



    const handleRemoveItem = (index, listName) => {
        if (listName === 'brand') {
            setBrandValues((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues.splice(index, 1);
                return updatedValues;
            });
        } else if (listName === 'material') {
            setMaterialValues((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues.splice(index, 1);
                return updatedValues;
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Sending data to API:', formData);
    };

    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'unisex', label: 'Unisex' },
    ];

    const sizeOptions = [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' },
        { value: 'xl', label: 'XL' },
    ];


    return (
        <div>
            <Stack style={{ display: "flex", flexDirection: "column" }}>
                <h5 style={{ textAlign: 'center', color: 'black', margin: '20px' }}>STORE PRODUCTS</h5>
                <form className='product-form' onSubmit={handleSubmit} style={{
                    marginTop: '2vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    alignContent: "Center",
                    borderRadius: '8px',
                    boxShadow: '0px 10px 10px',
                    padding: '20px',
                    backgroundColor: 'white',
                    border: '5px solid #ccc',
                    width: '400px',
                    margin: '0 auto',
                }}>
                    <TextField
                        id="product_name"
                        label="Product Name"
                        required
                        margin='normal'
                        size='small'
                        value={formData.product_name}
                        autoFocus
                        onChange={handleInputChange}
                    />
                    <TextField
                        id="product_description"
                        label="Product Description"
                        multiline rows={3}
                        required
                        margin='normal'
                        size='small'
                        value={formData.product_description}
                        onChange={handleInputChange}
                    />
                    <TextField
                        id="store_phone_number"
                        label="Store Phone Number"
                        required
                        margin='normal'
                        size='small'
                        value={formData.store_phone_number}
                        onChange={handleInputChange}

                    />

                    <TextField
                        id="categories"
                        label="Categories"
                        margin="normal"
                        size="small"
                        value={formData.categories}
                        onChange={handleInputChange}
                    />

                    <TextField
                        id="price"
                        label="Price"
                        required
                        margin='normal'
                        size='small'
                        value={formData.price}
                        onChange={handleInputChange}

                    />
                    <Select
                        isMulti
                        id="gender"
                        options={genderOptions}
                        value={genderOptions.filter((option) => formData.gender.includes(option.value))}
                        onChange={(selectedOptions) => handleListChange('gender', selectedOptions)}
                        placeholder="Select Gender"
                        


                    />

                    {brandValues.map((value, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <TextField
                                id={`brand-${index}`}
                                type="text"
                                value={value}
                                onChange={(e) => handleAddItem(e, index, 'brand')}
                                margin="normal"
                                size="small"
                                label={`Brand ${index + 1}`}
                            />
                            {index === brandValues.length - 1 && (
                                <>
                                    <button onClick={addBrandValue} style={{ marginLeft: '10px' }}>+</button>
                                    {brandValues.length > 1 && (
                                        <button onClick={() => handleRemoveItem(index, 'brand')} style={{ marginLeft: '10px' }}>-</button>
                                    )}
                                </>
                            )}
                        </div>
                    ))}

                    {materialValues.map((value, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <TextField
                                id={`material-${index}`}
                                type="text"
                                value={value}
                                onChange={(e) => handleAddItem(e, index, 'material')}
                                margin="normal"
                                size="small"
                                label={`Material ${index + 1}`}
                            />
                            {index === materialValues.length - 1 && (
                                <>
                                    <button onClick={addMaterialValue} style={{ marginLeft: '10px' }}>+</button>
                                    {materialValues.length > 1 && (
                                        <button onClick={() => handleRemoveItem(index, 'material')} style={{ marginLeft: '10px' }}>-</button>
                                    )}
                                </>
                            )}
                        </div>
                    ))}




                    <Select
                        isMulti
                        id="size"
                        options={sizeOptions}
                        value={sizeOptions.filter((option) => formData.size.includes(option.value))}
                        onChange={(selectedOptions) => handleListChange('size', selectedOptions)}
                        placeholder="Select Size"
                    />

                    <TextField
                        id="discount"
                        label="Discount"
                        required
                        margin='normal'
                        size='small'
                        value={formData.discount}
                        onChange={handleInputChange}

                    />
                    <TextField
                        id="product_count"

                        label="Product Count"
                        required
                        margin='normal'
                        size='small'
                        value={formData.product_count}
                        onChange={handleInputChange}

                    />
                    <TextField
                        id="warranty"
                        label="Warranty"
                        required
                        margin='normal'
                        size='small'
                        value={formData.warranty}
                        onChange={handleInputChange}

                    />
                    <TextField
                        id="warranty_duration"
                        label="Warranty Duration"
                        required
                        margin='normal'
                        size='small'
                        value={formData.warranty_duration}
                        onChange={handleInputChange}

                    />
                    <Typography > Created Date:</Typography>
                    <TextField
                        id="created_date"
                        required
                        margin='normal'
                        size='small'
                        type='datetime-local'
                        value={formData.created_date}
                        onChange={handleInputChange}

                    />
                    <Typography> Updated Date:</Typography>
                    <TextField
                        id="updated_date"
                        type='datetime-local'
                        required
                        margin='normal'
                        size='small'
                        value={formData.updated_date}
                        onChange={handleInputChange}

                    />


                    <button type="submit">Submit</button>
                </form>
            </Stack>
        </div>
    )
}

export default StoreProduct;
