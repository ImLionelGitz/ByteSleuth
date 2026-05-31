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

const compos: TableComponents<TableByte> = {
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

export default function DaTable({ table }: { table: TableByte[] }) {
   const renderHeader = () => (
      <TableRow sx={{ background: '#000' }}>
         {Object.keys(table[0]).map((row) => (
            <TableCell
               key={row}
               sx={{ textTransform: 'capitalize', color: 'aliceblue' }}
            >
               <strong>{row}</strong>
            </TableCell>
         ))}
      </TableRow>
   )

   const renderRow = (rowIndex: number) => (
      <>
         {Object.keys(table[rowIndex]).map((key, colIndex) => (
            <TableCell
               key={colIndex}
               sx={{
                  color: 'aliceblue',
                  width: 150,
                  overflow: 'auto',
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                  fontFamily: 'monospace',
                  border: '1px solid',
               }}
            >
               <div>{table[rowIndex][key]}</div>
            </TableCell>
         ))}
      </>
   )

   return (
      <TableVirtuoso
         data={table}
         components={compos}
         fixedHeaderContent={renderHeader}
         itemContent={renderRow}
         style={{
            width: '100%',
         }}
      />
   )
}
