import { ThemeProvider } from '@mui/material'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import theme from './theme.ts'

import './style.css'
// @ts-expect-error ts sucks
import 'react-color-palette/css'

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <ThemeProvider theme={theme}>
         <App />
      </ThemeProvider>
   </StrictMode>
)
