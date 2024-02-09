import * as React from 'react';
import { useState } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Button from '@mui/material/Button';

export default function StoreProductImage() {
    // const categories = localStorage.getItem('selectedCategories');
    const storePhone = localStorage.getItem('storePhoneNumber');
    console.log("Phone Number:",storePhone)
    const productName=localStorage.getItem('productStorageName');
    console.log("Product Name:",productName)
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        let files = Array.from(e.target.files);
        let validFiles = [];

        files.forEach((file) => {
            const size = file.size;
            if (size > 20000000) {
                alert('Image size should be less than 2MB');
                return;
            }
            validFiles.push(file);
        });

        setImages((prevImages) => [...prevImages, ...validFiles]);
    };

    const handleFileUpload = async () => {
        if (!images.length) {
            alert("Please select images to upload.");
            return;
        }
    
        const formData = new FormData();
        console.log("Phone Number is:",storePhone)
        formData.append('storePhone', storePhone);
        formData.append('productName', productName || '');
        images.forEach((image, index) => {
            formData.append('file', image);
        });
    
        try {
            const response = await fetch(`https://bnb.care4edu.com/bnb/image/store-product/multiple?storePhone=${storePhone}&productName=${productName}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': 'Basic ' + btoa('AllboutiqueNbeautique:9IOLDM5S7A8QSQW0E1R2T6Y4U8I3O'),
                },
            });
    
            if (response.ok) {
                alert("Images uploaded successfully.");
                setImages([]);
            } else {
                alert("Failed to upload images. Please try again.");
                console.error('Failed to upload images:', response.status, response.statusText);
            }
        } catch (error) {
            alert("An error occurred while uploading images. Please try again.");
            console.error('Error uploading images:', error);
        }
    };
    

    return (
        <form onSubmit={(e) => e.preventDefault()} style={{
            marginTop: '3vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '8px',
            boxShadow: '0px 10px 10px',
            padding: '20px',
            backgroundColor: 'white',
            border: '5px solid #ccc',
            width: '500px',
            margin: '0 auto',
        }}>
            <div style={{ marginTop: '10px' }}>
                <label style={{ textAlign: 'center', fontFamily: 'monospace' }}>
                    Upload Images <UploadFileIcon fontSize='large' />
                </label>
                <input type='file'
                    name='file'
                    onChange={handleImageChange}
                    multiple
                    required
                    style={{
                        border: '2px solid ',
                        padding: '1.5rem',
                        borderStyle: 'dotted',
                        borderRadius: '10px'
                    }}
                    placeholder='upload' />
            </div>

            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {images.map((file, index) => (
                    <div key={index} style={{ margin: '5px', position: 'relative' }}>
                        <img src={URL.createObjectURL(file)} alt={`Image ${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }} />
                    </div>
                ))}
            </div>

            <Button type='button' onClick={handleFileUpload} fullWidth variant='contained' color='secondary' style={{ margin: '1.9rem', width: '200px' }}>
                Upload Images
            </Button>
        </form>
    );
}
