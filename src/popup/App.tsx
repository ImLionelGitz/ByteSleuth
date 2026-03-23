import { AnimatePresence, motion } from 'motion/react'
import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Settings from './pages/Settings'
import { SleuthTheme } from './Theme'

export default function App() {
   // const startSelection = async () => {
   //    const [tab] = await chrome.tabs.query({
   //       active: true,Z
   //       currentWindow: true,
   //    })

   //    if (!tab.id) return

   //    chrome.tabs.sendMessage(tab.id, {
   //       type: 'START_SELECTION',
   //    })
   // }

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

   return (
      <SleuthTheme>
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
      </SleuthTheme>
   )
}
