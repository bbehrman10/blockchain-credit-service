import { Button, Container, Typography, Box, Paper, Grid } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <Container maxWidth="lg">
                  <Box sx={{ position: 'fixed', top: 0, left: 0, zIndex: 1000 }}>
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
      </Box>
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h1" component="h1" gutterBottom fontWeight='normal'>
          Blockchain Credit Service 
        </Typography>
        <Typography variant="h4" gutterBottom>
          Web2 Payments for a Web3 World
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f5f5f5' }} elevation={3}>
                <Typography variant="h5" component="h3" gutterBottom>
                Our Mission
                </Typography>
                <Typography variant="body1">
                Crypto operates like a cash only economy. We are here to change that.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f5f5f5' }} elevation={3}>
                <Typography variant="h5" component="h3" gutterBottom>
                  Codebase
                </Typography>
                <Typography variant="body1">
                 Learn more about our codebase here
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f5f5f5' }} elevation={3}>
                <Typography variant="h5" component="h3" gutterBottom>
                  Get Started Today
                </Typography>
                <Typography variant="body1">
                  Join us and experience the future of finance.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Link href="/login" passHref>
            <Button variant="contained" size="large">Get Started</Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
