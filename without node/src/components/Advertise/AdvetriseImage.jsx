import * as React from 'react';
import { useState } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Button from '@mui/material/Button';

export default function Advertiseimage() {
    const [images, setImages] = useState([]);
    const [adverId, setAdverId] = useState('');
    const [idGenerated, setIdGenerated] = useState(false);
    const [openModal, setOpenModal] = useState(false);

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

        setImages([...images, ...validFiles]);
    };

    const handleFileUpload = async () => {
        if (images.length > 0) {
            const formData = new FormData();

            images.forEach((img, index) => {
                formData.append(`file${index + 1}`, img);
            });

            try {
                const response = await fetch(
                    `https://utilities-shikshakpro.care4edu.com/c4e/advertisement/images/request?created_by=prem&id=${adverId}`,
                    {
                        method: 'POST',
                        body: formData,
                        headers: {
                            Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                        },
                    }
                ); 

                if (!response.ok) {
                    throw new Error('Failed to upload images');
                }

                setOpenModal(true);
                setAdverId('');
                setIdGenerated(false);
                setImages([]);
            } catch (error) {
                console.error('Error uploading images:', error);
                alert('Error uploading images. Please try again.');
            }
        } else {
            console.warn('Please select images before uploading.');
        }
    };

    const handleDeleteImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem', marginLeft: '16px' }}>
            <div style={{ marginTop: '10px' }}>
                <label style={{ textAlign: 'center', fontFamily: 'monospace' }}>
                    Upload Image <UploadFileIcon fontSize='large' />
                </label>
                <input type='file' name='file' onChange={handleImageChange} multiple required style={{ border: '2px solid ', padding: '1.5rem', borderStyle: 'dotted', borderRadius: '10px' }} placeholder='upload' />
            </div>

            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {images.map((file, index) => (
                    <div key={index} style={{ margin: '5px', position: 'relative' }}>
                        <img src={URL.createObjectURL(file)} alt={`Image ${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }} />
                        <Button onClick={() => handleDeleteImage(index)} style={{ position: 'absolute', top: '5px', right: '5px', padding: '4px', fontSize: '15px'}} color='error'>
                           Remove
                        </Button>
                    </div>
                ))}
            </div>

            <Button type='button' onClick={handleFileUpload} fullWidth variant='contained' color='secondary' style={{ margin: '1.9rem', width: '200px' }}>
                Upload Images
            </Button>
        </form>
    );
}
