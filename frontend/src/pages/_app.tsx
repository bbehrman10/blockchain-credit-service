// pages/_app.js or pages/_app.tsx
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#301934',
    },
    secondary: {
      main: '#03dac6',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    // Add component level styles here if needed
  },
});

function MyApp({ Component, pageProps }: { Component: React.ComponentType<any>, pageProps: any }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* This ensures a consistent baseline across browsers */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
