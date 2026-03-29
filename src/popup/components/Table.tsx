import type { TableData } from '@/Types'
import {
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableRow,
   useTheme,
} from '@mui/material'
import { forwardRef, useMemo } from 'react'
import { TableVirtuoso, type TableComponents } from 'react-virtuoso'

interface TableSection {
   data: TableData[]
}

export default function TableBit({ data }: TableSection) {
   const { palette } = useTheme()
   const textCol = palette.text.primary

   const compos: TableComponents<number> = {
      Scroller: forwardRef<HTMLDivElement>(function Scroller(props, ref) {
         return (
            <TableContainer
               ref={ref}
               component={Paper}
               sx={{
                  width: '97%',
                  background: palette.error.main,
                  color: textCol,
                  overflow: 'hidden',
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

   const Header = ({ cols }: { cols: TableData[] }) => (
      <TableRow sx={{ background: palette.error.dark }}>
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
                     maxWidth: 70,
                     overflow: 'auto',
                     whiteSpace: 'nowrap',
                     fontFamily: 'monospace',
                  }}
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
