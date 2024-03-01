import { useState } from 'react';
import { Button, Container, TextField, Typography, Box } from '@mui/material';
import Link from 'next/link';
import axios from 'axios';
import router from 'next/router';
import Image from 'next/image';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(email, password);
    try {
      const login = await axios.post('http://localhost:3001/api/users/login', {
        email,
        password
      });
      console.log('Login response:', login.data);
      // Redirect the user to the dashboard
      router.push('/dashboard');

      } catch (error) {
      console.error('Login error:', error);
      // Show error message to the user
    }
  }

  return (
    <Container component="main" maxWidth="xs">
                  <Box sx={{ position: 'fixed', top: 0, left: 0, zIndex: 1000 }}>
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
      </Box>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Link href="/signup" passHref>
            <Button fullWidth variant="text">Don't have an account? Sign Up</Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
