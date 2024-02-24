// pages/_app.js or pages/_app.tsx
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#36454F', // Charcoal
    },
    secondary: {
      main: '#F99048', // Tangerine
    },
    background: {
      default: '#121212', // Dark background
      paper: '#1e1e1e',
    },
    error: {
      main: '#FF5F52', // Adding an error color for completeness
    },
    warning: {
      main: '#FFC107', // Adding a warning color for completeness
    },
    info: {
      main: '#E5E4E2', // Platinum
    },
    success: {
      main: '#4CAF50', // Adding a success color for completeness
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    // Custom component styles can be added here
  },
});

const darkTheme2 = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#512D6D', // Deep Purple
    },
    secondary: {
      main: '#FFD700', // Gold
    },
    background: {
      default: '#2C2C2C', // Dark Grey
      paper: '#423F3E', // Smoky Black
    },
    error: {
      main: '#D32F2F', // For completeness
    },
    warning: {
      main: '#FFA000', // For completeness
    },
    info: {
      main: '#1976D2', // For completeness
    },
    success: {
      main: '#388E3C', // For completeness
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    // Custom component styles can be added here
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
    <ThemeProvider theme={lightTheme}>
      <CssBaseline /> {/* This ensures a consistent baseline across browsers */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
