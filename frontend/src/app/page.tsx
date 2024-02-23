import { Button, Container, Typography, Box, Paper, Grid } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Blockchain Credit Service
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Revolutionizing how you interact with blockchains.
        </Typography>

        <Box
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Image
            src="/logo.png" // Ensure you have a relevant SVG/image in your public folder
            alt="Blockchain Credit Service"
            width={180}
            height={180}
            priority
          />
          <Link href="/auth" passHref>
            <Button variant="contained" size="large">Get Started</Button>
          </Link>
        </Box>
      </Box>

      <Paper elevation={3} sx={{ p: 2, mt: 4 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Typography variant="h5" component="h3" gutterBottom>
              Why BCS?
            </Typography>
            <Typography>
              Ever wanted a credit card that works with your favorite blockchain? Look no further.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" component="h3" gutterBottom>
              Learn More
            </Typography>
            <Typography>
              Explore how our service works
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" component="h3" gutterBottom>
              Get Started
            </Typography>
            <Typography>
              Ready to dive in? Sign up today.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
