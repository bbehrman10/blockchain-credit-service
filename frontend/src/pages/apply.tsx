import { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import DashboardLayout from '@/components/DashboardLayout';
import router from 'next/router';

const Apply = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    income: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    ssn: '',
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
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      ssn: '123-45-6789',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // eventually - submit credit check api respond with approval or denial
    router.push('/approval');
    alert('Application Submitted');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <DashboardLayout>
        <Typography variant="h4" gutterBottom>
          Credit Card Application
        </Typography>
        <Button onClick={fillSampleData} variant="outlined" sx={{ mb: 2 }}>
          Fill with Sample Data
        </Button>
        <Paper sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="ZIP Code"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Social Security Number"
                  name="ssn"
                  value={formData.ssn}
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
        </Paper>
      </DashboardLayout>
    </Container>
  );
};

export default Apply;
