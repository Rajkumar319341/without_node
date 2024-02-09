import { Stack, TextField, Typography, MenuItem, Button, } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import './StoreProduct.css';

const StoreProduct = () => {
    const navigate = useNavigate();
    const [brandValues, setBrandValues] = useState([""]);
    const [materialValues, setMaterialValues] = useState([""]);
    const [productStorageName, setProductStorageName] = useState("");
    const storePhone = localStorage.getItem('storePhoneNumber');
    // console.log("Phone number fetched from local storage:",storePhone)

    useEffect(() => {
        localStorage.setItem('productStorageName', productStorageName);
    }, [productStorageName]);

    

    const addBrandValue = () => {
        setBrandValues([...brandValues, ""]);
    };

    const addMaterialValue = () => {
        setMaterialValues([...materialValues, ""]);
    };
    const [formData, setFormData] = useState({
        id: 0,
        store_phone_number: storePhone,
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
        updated_date: ""
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        switch (id) {
            case 'price':
            case 'product_count':
                if (!/^\d*\.?\d*$/.test(value)) {
                    alert("Only Integer Values are allowed")
                    return;
                }
                break;

            case 'discount':
                const discountValue = parseFloat(value);
                if (isNaN(discountValue) || discountValue < 1 || discountValue > 100) {
                    alert("Only values from 1 to 100 are allowed for Discount");
                    return;
                }
                break;

            default:
                break;
        }

        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };


    const handleListChange = (listName, selectedOptions) => {
        if (!Array.isArray(selectedOptions)) {
            console.error("Selected options is not an array:", selectedOptions);
            return;
        }

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
            setFormData((prevData) => ({
                ...prevData,
                brand: [...prevData.brand.slice(0, index), newValue, ...prevData.brand.slice(index + 1)],
            }));
        } else if (listName === 'material') {
            setMaterialValues((prevValues) => {
                const updatedValues = [...prevValues];
                updatedValues[index] = newValue;
                return updatedValues;
            });
            setFormData((prevData) => ({
                ...prevData,
                material: [...prevData.material.slice(0, index), newValue, ...prevData.material.slice(index + 1)],
            }));
        }

        // console.log('brandValues:', brandValues);
        // console.log('materialValues:', materialValues);
        // console.log('formData:', formData);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://bnb.care4edu.com/bnb/storeProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('AllboutiqueNbeautique:9IOLDM5S7A8QSQW0E1R2T6Y4U8I3O'),
                },
                body: JSON.stringify(formData),
            })
           

            if (response.ok) {
                alert('Submitted Successfully');
                console.log('Data successfully sent to API:', formData);
                navigate('/store-product-image')
            } else {
                alert('Failed to submit. Please try again.');
                console.error('Failed to submit data to API:', response.status, response.statusText);
            }
        } catch (error) {
            alert('An error occurred while submitting. Please try again.');
            console.error('Error submitting data:', error);
        }
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
                        onChange={(e) => {
                            setFormData((prevData) => ({
                                ...prevData,
                                product_name: e.target.value,
                            }));
                            setProductStorageName(e.target.value);
                        }}
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
                        required
                        id="categories"
                        label="Categories"
                        margin="normal"
                        size="small"
                        value={formData.categories}
                        onChange={handleInputChange}
                    />

                    <TextField
                        required
                        id="price"
                        label="Price"
                        margin='normal'
                        size='small'
                        value={formData.price}
                        onChange={handleInputChange}

                    />
                    <Select
                        required
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
                                label="Brand"
                                required
                                margin='normal'
                                size='small'
                                value={value}
                                onChange={(e) => handleAddItem(e, index, 'brand')}
                            />
                            {index === brandValues.length - 1 && (
                                <>
                                    <button type="button" onClick={addBrandValue} style={{ marginLeft: '10px' }}>+</button>
                                    {brandValues.length > 1 && (
                                        <button type="button" onClick={() => handleRemoveItem(index, 'brand')} style={{ marginLeft: '10px' }}>-</button>
                                    )}
                                </>
                            )}
                        </div>
                    ))}

                    {materialValues.map((value, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <TextField
                                label="Material"
                                required
                                margin='normal'
                                size='small'
                                value={value}
                                onChange={(e) => handleAddItem(e, index, 'material')}
                            />
                            {index === materialValues.length - 1 && (
                                <>
                                    <button type="button" onClick={addMaterialValue} style={{ marginLeft: '10px' }}>+</button>
                                    {materialValues.length > 1 && (
                                        <button type="button" onClick={() => handleRemoveItem(index, 'material')} style={{ marginLeft: '10px' }}>-</button>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                    <Select
                        required
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
    )
}

export default StoreProduct;
