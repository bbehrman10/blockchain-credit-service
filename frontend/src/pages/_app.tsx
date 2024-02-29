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


const darkTheme2 = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0D7377', // Teal
    },
    secondary: {
      main: '#14FFEC', // Neon Green
    },
    background: {
      default: '#323232', // Dark Charcoal
      paper: '#212121', // Almost Black
    },
    error: {
      main: '#FF5252', // Bright Red for alerts
    },
    warning: {
      main: '#FFC107', // Amber for warnings
    },
    info: {
      main: '#2196F3', // Bright Blue for information
    },
    success: {
      main: '#4CAF50', // Green for success
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    // You can add custom component styles here
  },
});




const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#EE6C4D', // Burnt Sienna
    },
    secondary: {
      main: '#B7B7A4', // Sage Green
    },
    background: {
      default: '#FAF0E6', // Linen
      paper: '#F0EDEE', // Alabaster
    },
    error: {
      main: '#E57373', // Adding an error color for completeness
    },
    warning: {
      main: '#FFB74D', // Adding a warning color for completeness
    },
    info: {
      main: '#64B5F6', // Adjusting for a lighter theme info color
    },
    success: {
      main: '#81C784', // Adjusting for a lighter theme success color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    // Custom component styles can be added here
  },
});
const lightTheme2 = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#30AAB0', // Mint Green
    },
    secondary: {
      main: '#FF6B6B', // Coral
    },
    background: {
      default: '#FFFFFF', // White
      paper: '#F0F0F0', // Light Grey
    },
    error: {
      main: '#E57373', // For completeness
    },
    warning: {
      main: '#FFB74D', // For completeness
    },
    info: {
      main: '#29B6F6', // For completeness
    },
    success: {
      main: '#66BB6A', // For completeness
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    // Custom component styles can be added here
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
