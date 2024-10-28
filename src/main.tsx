import 'normalize.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store } from '@store/index';
import { ThemeProvider, CssBaseline } from '@mui/material';
import App from './App';
import getTheme from './theme';
import { RootState } from '@store/index';
import { Theme } from '@mui/material/styles';
import { ThemeModeEnum } from '@enums';

function ThemedApp() {
  const mode: ThemeModeEnum.LIGHT | ThemeModeEnum.DARK = useSelector((state: RootState) => state.theme.mode);
  const theme: Theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  );
}

const rootElement = document.getElementById('root') as HTMLElement;

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <ThemedApp />
      </Provider>
    </StrictMode>
  );
}
