import {
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableRow,
} from '@mui/material'
import { forwardRef } from 'react'
import { TableVirtuoso, type TableComponents } from 'react-virtuoso'

const compos: TableComponents<number> = {
   Scroller: forwardRef<HTMLDivElement>(function Scroller(props, ref) {
      return (
         <TableContainer
            ref={ref}
            component={Paper}
            sx={{
               width: '97%',
               background: '#2c3549',
               overflow: 'auto',
            }}
            {...props}
         />
      )
   }),

   TableBody: forwardRef<HTMLTableSectionElement>(function Body(props, ref) {
      return <TableBody {...props} ref={ref} />
   }),

   Table: (props) => <Table {...props} stickyHeader />,
}

export default function DaTable() {
   const arr = new Array(15).fill('')

   const renderHeader = () => (
      <TableRow sx={{ background: '#000' }}>
         {arr.map((_, i) => (
            <TableCell
               key={i}
               sx={{ textTransform: 'capitalize', color: 'aliceblue' }}
            >
               <strong>{'title'}</strong>
            </TableCell>
         ))}
      </TableRow>
   )

   const renderRow = (rowIndex: number) => {
      return (
         <>
            {arr.map(() => (
               <TableCell
                  key={rowIndex}
                  sx={{
                     color: 'aliceblue',
                     width: '100vw',
                     overflow: 'auto',
                     whiteSpace: 'normal',
                     wordBreak: 'break-word',
                     fontFamily: 'monospace',
                     border: '1px solid',
                  }}
               >
                  <div>{rowIndex}</div>
               </TableCell>
            ))}
         </>
      )
   }

   return (
      <TableVirtuoso
         data={arr}
         components={compos}
         fixedHeaderContent={renderHeader}
         itemContent={renderRow}
         style={{
            width: '100%',
         }}
      />
   )
}
