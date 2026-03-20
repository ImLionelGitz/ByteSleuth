import { createTheme } from '@mui/material/styles'

const inputColor = 'aliceblue'

export const themeOptions = createTheme({
   palette: {
      mode: 'light',
      primary: {
         main: '#10aa1f',
      },
      secondary: {
         main: '#f50057',
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
               color: inputColor, // ✅ THIS controls the typed text

               '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: inputColor,
               },
               '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: inputColor,
               },
               '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: inputColor,
               },
            },
            input: {
               color: inputColor, // ✅ explicit input text color
            },
         },
      },
   },

   cssVariables: true,
})
