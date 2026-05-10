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

export default function DaTable() {
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

   const Header = () => (
      <TableRow sx={{ background: '#000' }}>
         {new Array(4).fill('Goku').map((title) => (
            <TableCell
               key={title}
               sx={{ textTransform: 'capitalize', color: 'aliceblue' }}
            >
               <strong>{title}</strong>
            </TableCell>
         ))}
      </TableRow>
   )

   const renderRow = (rowIndex: number) => {
      return (
         <>
            <TableCell
               key={rowIndex}
               sx={{
                  color: 'aliceblue',
                  width: 120,
                  overflow: 'auto',
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                  fontFamily: 'monospace',
                  border: '1px solid',
               }}
            >
               <div>{rowIndex}</div>
            </TableCell>
         </>
      )
   }

   return (
      <TableVirtuoso
         data={[1, 2]}
         components={compos}
         fixedHeaderContent={Header}
         itemContent={renderRow}
         style={{
            width: '100%',
         }}
      />
   )
}
