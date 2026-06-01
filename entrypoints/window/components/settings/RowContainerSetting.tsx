import { Button, Stack, Tooltip } from '@mui/material'
import { IoEyedrop } from 'react-icons/io5'
import { MdOpenInBrowser } from 'react-icons/md'

interface RowContainerSetting {
   myField: FieldByte
   onEditClick: () => void
   onSample: () => void
}

type BtnInfo = {
   icon: React.FC
   dynamic: boolean
   onClick: () => void
}

const btnSize = 23

export default function RowContainerSetting(props: RowContainerSetting) {
   const btns: Record<string, BtnInfo> = {
      edit_code: {
         dynamic: false,
         icon: MdOpenInBrowser,
         onClick: props.onEditClick,
      },
      pick_element: {
         dynamic: true,
         icon: IoEyedrop,
         onClick: props.onSample,
      },
   }

   return (
      <Stack
         direction="row"
         sx={{
            gap: 2,
            alignItems: 'center',
            justifyContent: 'space-between',
         }}
      >
         <strong style={{ textTransform: 'capitalize' }}>
            Add a row container
         </strong>

         <Stack direction="row" sx={{ gap: 1 }}>
            {Object.entries(btns).map(([key, value]) => (
               <Tooltip
                  key={key}
                  title={
                     <h1 style={{ fontSize: 10, textTransform: 'capitalize' }}>
                        {key.replace('_', ' ')}
                     </h1>
                  }
               >
                  <Button
                     size="small"
                     variant="contained"
                     color="secondary"
                     disableElevation
                     sx={{
                        minWidth: 0,
                        fontSize: 18,
                        fontFamily: 'Inter',
                        padding: 0,
                        width: btnSize,
                        height: btnSize,
                     }}
                     onClick={value.onClick}
                  >
                     <value.icon />
                  </Button>
               </Tooltip>
            ))}
         </Stack>
      </Stack>
   )
}
