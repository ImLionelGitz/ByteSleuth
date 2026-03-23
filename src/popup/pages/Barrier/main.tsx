import Barrier from '@/popup/pages/Barrier'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/popup/index.scss'

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <Barrier />
   </StrictMode>
)
