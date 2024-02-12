import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ad from '../../Assets/Images/Ad Logo.png'
import { useState } from 'react';
import validator from 'validator';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { postAddsRequest } from '../../Actions/api-query/Utilitesquery';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { Link } from 'react-router-dom';
import './Advertise.css'

const defaultTheme = createTheme();

export default function Advertise() {
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [duration, setDuration] = useState('');
  const [locationUrl, setLocationUrl] = useState('');
  const [file, setFile] = useState(null);
  const [address, setAddress] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [price, setPrice] = useState('');
  const [id, setId] = useState(0);
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('c4econsumer');
  const [password, setPassword] = useState('7A2Q5W4S6E8D9R0T1Y3U2I5O4P6L8K9');
  const [image, setImage] = useState(null);
  const [adverId, setadverId] = useState('');
  const [idGenerated, setIdGenerated] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
    window.location.reload();
  };


  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const size = e.target.files[0].size;
    if (size > 200000) {
      alert("Image size should be less than 2MB");
      return;
    }
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAdver = {
      id: 0,
      name: companyName,
      email: email,
      phoneNumber: parseInt(phoneNumber),
      description: description,
      address: address,
      pincode: parseInt(pinCode),
      googleMapLink: locationUrl,
      price: parseInt(price),
      duration: parseInt(duration),
      paymentStatus: paymentStatus
    };

    if (!validator.isEmail(email)) {
      alert("Invalid email address");
      return;
    }

    if (!/^\d{6}$/.test(pinCode)) {
      alert("Invalid PIN code. Please enter 6 digits without any letters or special characters.");
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      alert("Invalid phone number. Please enter 10 digits without any special characters.");
      return;
    }
    if (!/^https:\/\/.*/.test(locationUrl)) {
      alert("Invalid URL. Please make sure the URL starts with 'https://'.");
      return;
    }

    if (!/^\d{1,2}$/.test(duration) || parseInt(duration, 10) > 12 || parseInt(duration, 10) <= 0) {
      alert("Invalid duration. Please enter a valid duration less than or equal to 12 months.");
      return;
    }


    const response = await postAddsRequest(newAdver)
      .then((resp) => {
        // console.log(resp.id);
        setadverId(resp.id);
        setIdGenerated(true); // Set idGenerated to true
      })
      .catch((err) => {
        alert("unable to add");
      });
  };
  const handleFileUpload = () => {

    // console.log(`ID ${adverId}`);
    if (image) {
      const formData = new FormData();
      formData.append('file', image);
      const headers = new Headers();
      headers.append('Authorization', `Basic ${btoa(`${username}:${password}`)}`);

      // You can use fetch or any HTTP library to send the form data to your server
      // Example using fetch:
      fetch(`https://utilities-shikshakpro.care4edu.com/c4e/advertisement/images/request?created_by=prem&id=${adverId}&url=${locationUrl}`, {
        method: 'POST',
        body: formData,
        headers: headers,
      })
        .then(response => response.json())
        .then(data => {
          // alert('File uploaded successfully');
          setOpenModal(true);
          setadverId("")
          setIdGenerated(false)
          // console.log("cleaned up"+idGenerated+" "+adverId);
        })
        .catch(error => {
          console.error('Error uploading image:', error);
        });
    } else {
      console.warn('Please select an image before uploading.');
    }
  };

  return (
    <div >
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // border: '5px solid #ccc',
            borderRadius: '8px', 
            boxShadow: '0px 10px 10px ',
            padding: '10px',
            backgroundColor:'white'
          }}>
          <img src={ad} height="100"
            width="120" style={{
              objectFit: ' contain',
              borderRadius: '15px',
            }} />
          <Typography component="h1" variant="subtitle1" >
            Advertise
          </Typography>
          {idGenerated && idGenerated ? handleFileUpload() : <></>}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="CompanyName"
                  fullWidth
                  id="CompanyName"
                  label="Company Name"
                  autoFocus
                  required
                  onChange={(e) => setCompanyName(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Phone Number"
                  label="Phone Number"
                  name="Phone Number"
                  autoComplete="given-Phone Number"
                  onChange={(e) => setPhoneNumber(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  inputProps={{ minLength: 30 }}
                  name="Description"
                  label="Description"
                  type="Description"
                  id="Description"
                  autoComplete="new-Description"
                  onChange={(e) => setDescription(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Pin Code"
                  type="number"
                  id="Pin Code"
                  autoComplete="new-Pin"
                  onChange={(e) => setPinCode(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="Duration"
                  label="Duration in Month"
                  type="number"
                  id="Duration"
                  autoComplete="Duration"
                  onChange={(e) => setDuration(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Location url"
                  label="Location url"
                  type="Location url"
                  id="Location url"
                  autoComplete="new-Url"
                  onChange={(e) => setLocationUrl(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Address"
                  label="Address"
                  type="Address"
                  id="Address"
                  autoComplete="Address"
                  onChange={(e) => setAddress(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Price"
                  type="number"
                  id="Price"
                  autoComplete="new-Price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Grid>
              {/* <Grid item xs={12}sm={6}>
                <TextField
                  required
                  fullWidth
                  label="PaymentStatus"
                  type="PaymentStatus"
                  id="PaymentStatus"
                  autoComplete="new-PaymentStatus"
                  onChange={(e) => setPaymentStatus(e.target.value)}
                />
              </Grid> */}
              <br />
              <div className='advertise_upload' style={{ marginLeft: "15px", marginTop: "10px" }}>
                <label style={{ textAlign: "center", marginTop: "1.5rem", fontFamily: "monospace" }}>Upload Ad Image <UploadFileIcon fontSize='large' /></label>
                <input className='advertise_choosefile' type="file"  name='file' onChange={handleImageChange} required style={{ border: "2px solid ", padding: "1.5rem", borderStyle: "dotted", borderRadius: "10px" }} placeholder='upload' />
              </div>
              {/* <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={handleFileUpload}
                style={{ margin: "1.9rem" }}
                sx={{ mt: 3, mb: 2 }}
                >
                Upload Image 
              </Button> */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" required />}
                  label={
                    <span>
                      I Agree to the  { }
                      <Link to='/TermsAndConditions'>
                        Terms And Conditions.</Link>
                    </span>} onChange={(e) => setAgreeTerms(e.target.value)} />
              </Grid>
            </Grid>
            {idGenerated && idGenerated ? <></> : <Button type="submit"
              // fullWidth


              
              className='advertise_button'
              variant="contained"
              color='secondary'
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>}

          </Box>
        </Box>
      </Container>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Form Submitted Successfully!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your form has been submitted successfully.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
    </div>
  );
} 
