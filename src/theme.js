import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00FF85',
      dark: '#00CC6A',
      light: '#33FF9D',
    },
    background: {
      default: '#0A0B0D',
      paper: '#12131A',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 500,
    },
    h6: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 500,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '12px 24px',
          fontSize: '1rem',
        },
        containedPrimary: {
          background: 'linear-gradient(90deg, #00FF85 0%, #00CC6A 100%)',
          '&:hover': {
            background: 'linear-gradient(90deg, #00CC6A 0%, #009950 100%)',
          },
        },
        outlinedPrimary: {
          borderColor: '#00FF85',
          '&:hover': {
            borderColor: '#00CC6A',
            background: 'rgba(0, 255, 133, 0.1)',
          },
        },
      },
    },
  },
});

export default theme; 