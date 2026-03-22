import type { TableData } from '@/Types'
import {
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableRow,
} from '@mui/material'
import { forwardRef, useMemo } from 'react'
import { TableVirtuoso, type TableComponents } from 'react-virtuoso'

interface TableSection {
   data: TableData[]
}

const textCol = '#ececec'
const scroll_classname =
   'scrollbar scrollbar-thumb-[#0da26b] scrollbar-track-transparent'

const compos: TableComponents<number> = {
   Scroller: forwardRef<HTMLDivElement>(function Scroller(props, ref) {
      return (
         <TableContainer
            ref={ref}
            component={Paper}
            sx={{
               width: '97%',
               background: '#3c3c3c',
               color: textCol,
               overflow: 'hidden',
            }}
            className={`${scroll_classname} h-32`}
            {...props}
         />
      )
   }),

   TableBody: forwardRef<HTMLTableSectionElement>(function Body(props, ref) {
      return <TableBody {...props} ref={ref} />
   }),

   Table: (props) => <Table {...props} stickyHeader />,
}

const Header = ({ cols }: { cols: TableData[] }) => (
   <TableRow sx={{ background: '#2e2e2e' }}>
      {cols.map(({ title }) => (
         <TableCell
            key={title}
            sx={{ textTransform: 'capitalize', color: textCol }}
         >
            <strong>{title}</strong>
         </TableCell>
      ))}
   </TableRow>
)

export default function TableBit({ data }: TableSection) {
   /**
    * 🔑 Compute max rows across all columns
    */
   const rowCount = useMemo(() => {
      return Math.max(...data.map((col) => col.data.length))
   }, [data])

   /**
    * 🔑 Create row indices [0,1,2,...]
    */
   const rows = useMemo(() => {
      return Array.from({ length: rowCount }, (_, i) => i)
   }, [rowCount])

   /**
    * 🔑 Render each row using index
    */
   const renderRow = (rowIndex: number) => {
      return (
         <>
            {data.map((col, colIndex) => (
               <TableCell
                  key={colIndex}
                  sx={{
                     color: textCol,
                     maxWidth: 120,
                     overflow: 'auto',
                     whiteSpace: 'nowrap',
                     fontFamily: 'monospace',
                  }}
                  className={scroll_classname}
               >
                  {col.data[rowIndex] ?? ''}
               </TableCell>
            ))}
         </>
      )
   }

   return (
      <TableVirtuoso
         data={rows}
         components={compos}
         fixedHeaderContent={() => <Header cols={data} />}
         itemContent={(_, rowIndex) => renderRow(rowIndex)}
         style={{
            width: '100%',
         }}
      />
   )
}
