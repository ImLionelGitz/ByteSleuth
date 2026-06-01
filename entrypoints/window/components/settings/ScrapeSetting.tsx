import { Button, Stack } from '@mui/material'

export default function ScrapeSetting({ onClick }: { onClick: () => void }) {
   return (
      <Stack
         direction="row"
         sx={{
            gap: 2,
            alignItems: 'center',
            justifyContent: 'space-evenly',
         }}
      >
         <strong style={{ textTransform: 'capitalize' }}>
            Change scraper behaivor
         </strong>

         <Button
            size="small"
            variant="contained"
            color="secondary"
            disableElevation
            sx={{ minWidth: 0, fontSize: 10, fontFamily: 'Inter' }}
            onClick={onClick}
         >
            Open Editor
         </Button>
      </Stack>
   )
}
