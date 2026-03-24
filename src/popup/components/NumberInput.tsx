import { NumberField as BaseNumberField } from '@base-ui/react/number-field'
import { OutlinedInput, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import { useId } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

export default function NumberInput({
   id: idProp,
   error,
   size = 'medium',
   ...other
}: BaseNumberField.Root.Props & {
   size?: 'small' | 'medium'
   error?: boolean
}) {
   let id = useId()
   if (idProp) {
      id = idProp
   }

   const { palette } = useTheme()

   return (
      <BaseNumberField.Root
         {...other}
         render={(props, state) => (
            <FormControl
               size={size}
               ref={props.ref}
               disabled={state.disabled}
               required={state.required}
               error={error}
               variant="outlined"
               sx={{
                  width: 120,

                  '& .MuiButton-root': {
                     borderColor: 'divider',
                     minWidth: 0,
                     bgcolor: 'action.hover',
                     '&:not(.Mui-disabled)': {
                        color: 'text.primary',
                     },
                  },
               }}
            >
               {props.children}
            </FormControl>
         )}
      >
         <Box sx={{ display: 'flex' }}>
            <BaseNumberField.Increment
               render={
                  <Button
                     variant="outlined"
                     aria-label="Increase"
                     size={size}
                     sx={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderLeft: '0px',
                        '&.Mui-disabled': {
                           borderLeft: '0px',
                        },
                     }}
                  />
               }
            >
               <FaPlus fontSize={size} color={palette.text.primary} />
            </BaseNumberField.Increment>

            <BaseNumberField.Input
               id={id}
               render={(props, state) => (
                  <OutlinedInput
                     inputRef={props.ref}
                     value={state.inputValue}
                     onBlur={props.onBlur}
                     onChange={props.onChange}
                     onKeyUp={props.onKeyUp}
                     onKeyDown={props.onKeyDown}
                     onFocus={props.onFocus}
                     slotProps={{
                        input: {
                           ...props,
                           size:
                              Math.max(
                                 (other.min?.toString() || '').length,
                                 state.inputValue.length || 1
                              ) + 1,
                           sx: {
                              textAlign: 'center',
                           },
                        },
                     }}
                     sx={{ pr: 0, borderRadius: 0, flex: 1 }}
                  />
               )}
            />

            <BaseNumberField.Decrement
               render={
                  <Button
                     variant="outlined"
                     aria-label="Decrease"
                     size={size}
                     sx={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        borderRight: '0px',
                        '&.Mui-disabled': {
                           borderRight: '0px',
                        },
                     }}
                  />
               }
            >
               <FaMinus fontSize={size} color={palette.text.primary} />
            </BaseNumberField.Decrement>
         </Box>
      </BaseNumberField.Root>
   )
}
