import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainPage from './pages/MainPage';
import ResponsiveAppBar from './components/Navbar/NavBar';
import Footer from './components/footer/Footer';
import { Analytics } from '@vercel/analytics/react';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [mode, setMode] = React.useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <ResponsiveAppBar theme={theme} colorMode={colorMode} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage theme={theme} />} />
          </Routes>
        </BrowserRouter>
        <Footer theme={theme} />
      </div>
      <Analytics />
    </ThemeProvider>
  );
}

export default App;
