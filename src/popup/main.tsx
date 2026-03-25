import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
// @ts-expect-error the compiler sucks
import 'react-color-palette/css'
import { MemoryRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <MemoryRouter>
         <App />
      </MemoryRouter>
   </StrictMode>
)
