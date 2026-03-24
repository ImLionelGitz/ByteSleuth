import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
// @ts-expect-error the compiler sucks
import 'react-color-palette/css'
import { MemoryRouter } from 'react-router-dom'

const rootElem = document.getElementById('root')!
rootElem.style.width = '320px'
rootElem.style.height = '400px'

createRoot(rootElem).render(
   <StrictMode>
      <MemoryRouter>
         <App />
      </MemoryRouter>
   </StrictMode>
)
