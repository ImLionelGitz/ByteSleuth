import Results from '@/popup/pages/Results'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/popup/index.scss'

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <Results />
   </StrictMode>
)
