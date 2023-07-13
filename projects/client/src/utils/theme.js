import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#f0f0f0',
      button: '#00A8B5',
    },
    secondary: {
      main: '#00A8B5',
    },
    button: {
      main: '#00A8B5',
      hover: '#dddddd',
    },
  },
});

export default defaultTheme;
