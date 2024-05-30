import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import TimeContextProvider from './TimerContext.tsx';
import { Container, CssBaseline } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './index.css';

const defaultTheme = createTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <TimeContextProvider>
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <App />
        </Container>
      </TimeContextProvider>
    </ThemeProvider>
  // </React.StrictMode>
);
