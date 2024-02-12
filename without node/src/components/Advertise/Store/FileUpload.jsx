import * as React from 'react';
import { useState } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Button from '@mui/material/Button';
import StoreRegister from './StoreRegister';
import './File_Upload.css';

// const username = 'bnb_api';
// const password = 'QSJNVBSNSBJHSTUHJSISIJSSEV';

export default function FileUpload() {

    const categories = localStorage.getItem('selectedCategories');
    console.log(`categories${categories}`);
    const storePhone = localStorage.getItem('storePhoneNumber');
    console.log("Phone no:", storePhone)
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
        console.log("Valid files:", validFiles);
        setImages((prevImages) => [...prevImages, ...validFiles]);
    };

    const handleFileUpload = async () => {
        if (images.length > 0) {
            const form= new FormData();
            // console.log("Type of form:",form.type)
            console.log("Phone number to store:",storePhone)
            form.append('phone',storePhone);
            console.log("Form after append phone no:",form)
            form.append('category',categories || ''); 
            console.log("Images before upload:", images); 
            // images.forEach((img, index) => {
            //     form.append('files',img); 
            //     console.log("Image Path:", img);
            // });
            images.forEach((img, index) => {
                form.append('file', img); 
                console.log("Image Path:", img);
            });
            
    
            console.log("Form Data before fetch:", form);
            try {
                const response = await fetch(
                    `https://bnb.care4edu.com/bnb/images/store/multiple?phone=${storePhone}&category=${categories || ''}`,
                    {
                        method: 'POST',
                        body: form,
                        headers: {
                            'Authorization': 'Basic ' + btoa('AllboutiqueNbeautique:9IOLDM5S7A8QSQW0E1R2T6Y4U8I3O'),
                        },
                    }
                );
    
                console.log(response.status);
                const responseBody = await response.json(); 
                console.log("Response body:",responseBody);
                console.log("Response body:", responseBody.status); 
    
                if (response.ok) {
                    alert("Images added Successfully")
                    
                }else{
                    throw new Error(`Failed to upload images. Status: ${response.status}`);
                   
                }
    
               
                setOpenModal(true);
                setAdverId('');
                setIdGenerated(false);
            } catch (error) {
                console.error('Error uploading images:', error);
                alert(`Error uploading images: ${error.message}`);
            } finally {
               
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
        <form className='fileupload_form' onSubmit={handleSubmit} style={{
            marginTop: '4vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '8px',
            boxShadow: '0px 10px 10px',
            padding: '20px',
            backgroundColor: 'white',
            border: '5px solid #ccc',
            // width: '500px',
            margin: '0 auto',
        }}>
            <div style={{ marginTop: '10px' }}>
                <label style={{ textAlign: 'center', fontFamily: 'monospace' }}>
                    Upload Images <UploadFileIcon fontSize='large' />
                </label>
                <input type='file'
                className='file_input'
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
