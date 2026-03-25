import { AnimatePresence, motion } from 'motion/react'
import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Settings from './pages/Settings'
import { SleuthTheme } from './Theme'
import { Backdrop, GlobalStyles } from '@mui/material'
import { OPEN_MENU } from '@/Messages'

export default function App() {
   const [appVisible, setVisibility] = useState(false)
   const location = useLocation()

   const PageWrapper = ({ children }: { children: React.ReactNode }) => (
      <motion.div
         initial={{ x: '100%' }}
         animate={{ x: 0 }}
         exit={{ x: '-100%' }}
         transition={{ duration: 0.19 }}
      >
         {children}
      </motion.div>
   )

   useEffect(() => {
      chrome.runtime.onMessage.addListener((msg) => {
         if (msg === OPEN_MENU) {
            if (appVisible) setVisibility(false)
            else setVisibility(true)
         }
      })
   }, [appVisible])

   return (
      <SleuthTheme>
         <GlobalStyles
            styles={({ palette }) => ({
               body: {
                  backgroundColor: 'transparent',
               },

               '.real-window': {
                  backgroundColor: palette.background.default,
                  width: 320,
                  minHeight: 400,
                  overflow: 'hidden',
               },
            })}
         />

         <Backdrop
            open={appVisible}
            sx={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}
         >
            <div className="real-window">
               <AnimatePresence mode="wait">
                  <Routes location={location} key={location.pathname}>
                     <Route
                        path="/"
                        element={
                           <PageWrapper>
                              <Home />
                           </PageWrapper>
                        }
                     />

                     <Route
                        path="/settings"
                        element={
                           <PageWrapper>
                              <Settings />
                           </PageWrapper>
                        }
                     />
                  </Routes>
               </AnimatePresence>
            </div>
         </Backdrop>
      </SleuthTheme>
   )
}
