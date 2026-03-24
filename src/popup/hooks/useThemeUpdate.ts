import { useContext } from 'react'
import { ThemeUpdateCtx } from '../Theme'

export const useThemeUpdate = () => {
   const context = useContext(ThemeUpdateCtx)
   if (!context) {
      throw new Error(
         'useThemeUpdate must be used within a CustomThemeProvider'
      )
   }
   return context
}
