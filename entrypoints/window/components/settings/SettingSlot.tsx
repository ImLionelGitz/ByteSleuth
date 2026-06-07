import { Stack } from '@mui/material'
import { ReactNode } from 'react'

interface SettingSlotProps {
   title: string
   children: ReactNode
}

export default function SettingSlot({ title, children }: SettingSlotProps) {
   return (
      <Stack
         direction="row"
         sx={{ gap: 5, alignItems: 'center', justifyContent: 'space-between' }}
      >
         <strong style={{ textTransform: 'capitalize' }}>{title}</strong>

         {children}
      </Stack>
   )
}
