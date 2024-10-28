import { createTheme, Theme } from '@mui/material/styles';
import { ThemeModeEnum } from '@enums';

export default function getTheme(mode: ThemeModeEnum.LIGHT | ThemeModeEnum.DARK): Theme {
  return createTheme({
    palette: {
      mode: mode,
      primary: {
        main: '#1976d2',
        contrastText: '#fff',
      },
      secondary: {
        main: '#dc004e',
        contrastText: '#fff',
      },
      background: {
        default: mode === ThemeModeEnum.LIGHT ? '#f5f5f5' : '#121212',
        paper: mode === ThemeModeEnum.LIGHT ? '#ffffff' : '#1e1e1e',
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
      h1: {
        fontSize: '2rem',
        fontWeight: 700,
      },
      h2: {
        fontSize: '1.75rem',
        fontWeight: 700,
      },
      body1: {
        fontSize: '1rem',
      },
      button: {
        textTransform: 'none',
      },
    },
  });
}
