import { Box, Paper } from '@mui/material'

interface TablePanel {
   size: number
}

export default function TablePanel({ size }: TablePanel) {
   return (
      <Paper variant="outlined" sx={{ width: size, height: size }}>
         <Box>lol</Box>
      </Paper>
   )
}
