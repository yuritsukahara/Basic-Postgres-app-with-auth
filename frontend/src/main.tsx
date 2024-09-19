import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createRouter } from '@tanstack/react-router'

import { ToastContainer } from 'react-toastify'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';

import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { indigo, orange } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ptBR } from '@mui/x-data-grid/locales';
import { ptBR as corePtBR } from '@mui/material/locale';
import { ptBR as pickersPtBR } from '@mui/x-date-pickers/locales';

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import App from './App'

// Create a new router instance
const router = createRouter({ routeTree, context: { authentication: undefined! } })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const temaProvolt = createTheme(
  {
    typography: {
      fontSize: 14,
    },
    palette: {
      primary: {
        main: indigo[900],
      },
      secondary: {
        main: orange[900],
      },
    },
  },
  ptBR, // x-data-grid translations
  pickersPtBR, // x-date-pickers translations
  corePtBR, // core translations
);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline enableColorScheme />
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={temaProvolt}>
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
    <ToastContainer position='bottom-right' autoClose={4000} pauseOnHover />
  </StrictMode>,
)
