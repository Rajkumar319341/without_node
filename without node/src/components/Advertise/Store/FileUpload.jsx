import * as React from 'react';
import { useState } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Button from '@mui/material/Button';
import StoreRegister from './StoreRegister';

const username = 'bnb_api';
const password = 'QSJNVBSNSBJHSTUHJSISIJSSEV';

export default function FileUpload() {

    const categories = localStorage.getItem('selectedCategories');
    console.log(`categories${categories}`);
    const storePhone = localStorage.getItem('storePhoneNumber')
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

        setImages((prevImages) => [...prevImages, ...validFiles]);
    };

    const handleFileUpload = async () => {
        if (images.length > 0) {
            const form = new FormData();

            form.append('phone', storePhone);
            form.append('category', categories || ''); // Ensure categories is not null

            images.forEach((img, index) => {
                form.append('files', img, img.name); // Use img.name for filename
            });

            try {
                const response = await fetch(
                    `https://bnb.care4edu.com/bnb/images/store/multiple?phone=${storePhone}&category=${categories || ''}`,
                    {
                        method: 'POST',
                        body: form,
                        headers: {
                            Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                        },
                    }
                );

                console.log(response.status);
                console.log(await response.text()); // Log the textual representation of the response

                if (!response.ok) {
                    throw new Error(`Failed to upload images. Status: ${response.status}`);
                }

                // Handle success
                setOpenModal(true);
                setAdverId('');
                setIdGenerated(false);
            } catch (error) {
                console.error('Error uploading images:', error);
                alert(`Error uploading images: ${error.message}`);
            } finally {
                // Close modal and reset images regardless of success or failure
                setImages([]);
            }
        } else {
            console.warn('Please select images before uploading.');
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

    };

    return (
        <form onSubmit={handleSubmit} style={{
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
