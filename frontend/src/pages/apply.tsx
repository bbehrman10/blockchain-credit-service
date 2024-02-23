import { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import DashboardLayout from '@/components/DashboardLayout';

const Apply = () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      income: '',
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const fillSampleData = () => {
      setFormData({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        income: '50000',
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Submit form logic here
      console.log(formData);
      alert('Application Submitted');
    };
  
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <DashboardLayout>
        <Typography variant="h4" gutterBottom>
          Credit Card Application
        </Typography>
        <Button onClick={fillSampleData} variant="outlined" sx={{ mb: 2 }}>
          Fill with Sample Data
        </Button>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Annual Income"
                name="income"
                type="number"
                value={formData.income}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary">
                Submit Application
              </Button>
            </Grid>
          </Grid>
        </form>
        </DashboardLayout>
      </Container>
    );
  };
  
  export default Apply;
  