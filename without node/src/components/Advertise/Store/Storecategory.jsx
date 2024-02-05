import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import { APIData } from '../../../Actions/api-constants/APIData';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { ApiConstants } from '../../../ApiConstants';

export default function Storecategory() {

  const storePhone = localStorage.getItem('storePhoneNumber')
  const storeDesc= localStorage.getItem('specializationDescription')
  const [category, setCategory] = useState([]);
  const [selectedcategory, setSelectedCategory] = useState([]);
  console.log(storePhone);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => { 
      const url = APIData.api + "category";
      try {
        const response = await fetch(url, { headers: APIData.headers });
        const jsonResponse = await response.json();
        // console.log(jsonResponse);
        setCategory(jsonResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      }  
    };  
    fetchData();
  }, []);
  
  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(selectedcategory);
  
    for (let i = 0; i < selectedcategory.length; i++) {
      const postData = {
        id: 0,
        phone: storePhone,
        storeCategory: selectedcategory[i],
        categoryDescription: storeDesc,
      };
  
      console.log(postData);
  
      
      var basicAuth = "Basic " + btoa("AllboutiqueNbeautique".concat(":", "9IOLDM5S7A8QSQW0E1R2T6Y4U8I3O"))
      fetch(ApiConstants.baseApi + 'stores/categories', {
        method: 'POST',
        headers: {
         
          'Authorization': basicAuth,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem('selectedCategories', postData.storeCategory);
          console.log(`storePhone${storePhone}`);
          console.log('Success:', data);
          // Ensure any further asynchronous operations are done here
          navigate('/FileUpload');
        })
        .catch((error) => {
          // Handle errors
          console.error('Error:', error);
        });
    }
  };
  

  return (
    <div >
      <p style={{ textAlign: "center", margin: 17, fontSize:"20px" }}>Store Type</p>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '35ch' },
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}
          autoComplete="off" >
          <TextField
            select
            required
            label="Select"
            helperText="Please select your Store type"
            value={selectedcategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            SelectProps={{
              multiple: true,
            }}
          >
            {category.map((option) => (
              <MenuItem key={option.categoryName} value={option.categoryName}>
                {option.categoryName}
              </MenuItem>
            ))}
          </TextField>
          <Button onClick={handleAdd} variant="outlined">Add</Button>
        </div>
      </Box>
    </div>
  );
}



