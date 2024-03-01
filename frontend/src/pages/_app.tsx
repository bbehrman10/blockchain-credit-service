// pages/_app.js or pages/_app.tsx
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const lightTheme3 = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5E97F6', // Soft Blue
    },
    secondary: {
      main: '#FFD54F', // Sunshine Yellow
    },
    background: {
      default: '#EDE7F6', // Light Lavender
      paper: '#FFFFFF', // Pure White
    },
    error: {
      main: '#E57373', // Soft Red for alerts
    },
    warning: {
      main: '#FFB74D', // Light Orange for warnings
    },
    info: {
      main: '#64B5F6', // Sky Blue for information
    },
    success: {
      main: '#81C784', // Pastel Green for success
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    // You can add custom component styles here
  },
});




function MyApp({ Component, pageProps }: { Component: React.ComponentType<any>, pageProps: any }) {
  return (
    <ThemeProvider theme={lightTheme3}>
      <CssBaseline /> {/* This ensures a consistent baseline across browsers */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
