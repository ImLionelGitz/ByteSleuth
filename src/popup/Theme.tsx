import { CssBaseline } from '@mui/material'
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles'
import { createContext, ReactNode, useMemo, useReducer } from 'react'

type State = {
   primaryColor: string
   secondaryColor: string
   textColor: string
   backgroundColor: string
   highlighterColor: string
}

type themeColors = 'PRIMARY' | 'SECONDARY' | 'TEXT' | 'BG' | 'HIGHLIGHTER'

type Action = {
   payload: string
   type: themeColors
}

interface ThemeContextType {
   theme: State
   setTheme: (type: themeColors, color: string) => void
}

const initialState: State = {
   primaryColor: '#10aa1f',
   secondaryColor: '#f50057',
   textColor: '#f0f8ff',
   backgroundColor: '#6722a3',
   highlighterColor: '#f50057',
}

function reducer(state: State, action: Action): State {
   switch (action.type) {
      case 'PRIMARY':
         return {
            ...state,
            primaryColor: action.payload,
         }

      case 'SECONDARY':
         return {
            ...state,
            secondaryColor: action.payload,
         }

      case 'TEXT':
         return {
            ...state,
            textColor: action.payload,
         }

      case 'BG':
         return {
            ...state,
            backgroundColor: action.payload,
         }

      case 'HIGHLIGHTER':
         return {
            ...state,
            highlighterColor: action.payload,
         }
   }
}

export const ThemeUpdateCtx = createContext<ThemeContextType | undefined>(
   undefined
)

export function SleuthTheme({ children }: { children: ReactNode }) {
   const [themeState, dispatch] = useReducer(reducer, initialState)

   const theme: Theme = useMemo(
      () =>
         createTheme({
            palette: {
               mode: 'light',
               primary: {
                  main: themeState.primaryColor,
               },
               secondary: {
                  main: themeState.secondaryColor,
               },
               text: {
                  primary: themeState.textColor,
               },
               background: {
                  default: themeState.backgroundColor,
               },

               info: {
                  main: themeState.highlighterColor,
               },
            },

            components: {
               MuiSwitch: {
                  styleOverrides: {
                     root: {
                        width: 40,
                        height: 24,
                        padding: 0,
                        display: 'flex',
                     },

                     switchBase: {
                        padding: 3,
                        transitionDuration: '300ms',

                        '&.Mui-checked': {
                           transform: 'translateX(16px)',
                           color: '#fff',

                           '& + .MuiSwitch-track': {
                              backgroundColor: '#10aa1f', // Material You primary
                              opacity: 1,
                           },
                        },
                     },

                     thumb: {
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                     },

                     track: {
                        borderRadius: 32 / 2,
                        backgroundColor: '#E7E0EC', // Material You surface variant
                        opacity: 1,
                        transition: 'background-color 300ms ease',
                     },
                  },
               },

               MuiOutlinedInput: {
                  styleOverrides: {
                     root: {
                        color: themeState.textColor, // ✅ THIS controls the typed text

                        '& .MuiOutlinedInput-notchedOutline': {
                           borderColor: themeState.textColor,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                           borderColor: themeState.textColor,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                           borderColor: themeState.textColor,
                        },
                     },
                     input: {
                        color: themeState.textColor, // ✅ explicit input text color
                     },
                  },
               },
            },

            cssVariables: true,
         }),
      [themeState]
   )

   return (
      <ThemeUpdateCtx.Provider
         value={{
            theme: themeState,
            setTheme: (type, color) => {
               dispatch({ type: type, payload: color })
            },
         }}
      >
         <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
         </ThemeProvider>
      </ThemeUpdateCtx.Provider>
   )
}
