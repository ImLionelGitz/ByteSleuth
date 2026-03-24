import { ThemeFields } from '@/Vars'
import { CssBaseline } from '@mui/material'
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles'
import { createContext, ReactNode, useEffect, useMemo, useReducer } from 'react'

type State = {
   button_color_1: string
   button_color_2: string
   text_color: string
   background_color: string
   highlight_color: string
   table_color: string
}

type Action =
   | { type: 'UPDATE'; payload: { key: keyof State; val: string } }
   | { type: 'LOAD'; payload: State }
   | { type: 'RESET' }

interface ThemeContextType {
   theme: State
   setTheme: (type: string, color: string) => void
   resetTheme: () => void
}

const defaultState: State = {
   button_color_1: '#10aa1f',
   button_color_2: '#f50057',
   text_color: '#f0f8ff',
   background_color: '#6722a3',
   highlight_color: '#f50057',
   table_color: '#2e2e2e',
}

function reducer(state: State, action: Action): State {
   switch (action.type) {
      case 'UPDATE': {
         const newState = {
            ...state,
            [action.payload.key]: action.payload.val,
         }

         chrome.storage.local.set({ [ThemeFields]: newState })
         return newState
      }

      case 'RESET':
         chrome.storage.local.set({ [ThemeFields]: {} })
         return defaultState

      case 'LOAD':
         return action.payload

      default:
         return state
   }
}

export const ThemeUpdateCtx = createContext<ThemeContextType | undefined>(
   undefined
)

export function SleuthTheme({ children }: { children: ReactNode }) {
   const [themeState, dispatch] = useReducer(reducer, defaultState)

   useEffect(() => {
      chrome.storage.local.get(ThemeFields, (res: Record<string, State>) => {
         const loaded = res[ThemeFields]

         if (loaded) {
            dispatch({ type: 'LOAD', payload: { ...defaultState, ...loaded } })
         }
      })
   }, [])

   const theme: Theme = useMemo(
      () =>
         createTheme({
            palette: {
               mode: 'light',
               primary: {
                  main: themeState.button_color_1,
               },
               secondary: {
                  main: themeState.button_color_2,
               },
               text: {
                  primary: themeState.text_color,
               },
               background: {
                  default: themeState.background_color,
               },

               info: {
                  main: themeState.highlight_color,
               },

               error: {
                  main: themeState.table_color,
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
                           color: themeState.text_color,

                           '& + .MuiSwitch-track': {
                              background_color: themeState.button_color_1, // Material You primary
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
                        backgroundColor: themeState.text_color, // Material You surface variant
                        opacity: 1,
                        transition: 'background-color 300ms ease',
                     },
                  },
               },

               MuiOutlinedInput: {
                  styleOverrides: {
                     root: {
                        color: themeState.text_color, // ✅ THIS controls the typed text

                        '& .MuiOutlinedInput-notchedOutline': {
                           borderColor: themeState.text_color,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                           borderColor: themeState.text_color,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                           borderColor: themeState.text_color,
                        },
                     },
                     input: {
                        color: themeState.text_color, // ✅ explicit input text color
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
               dispatch({
                  type: 'UPDATE',
                  payload: { key: type as keyof State, val: color },
               })
            },
            resetTheme: () => {
               dispatch({ type: 'RESET' })
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
