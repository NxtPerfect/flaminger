import React from 'react'
import TableHead from '../atoms/TableHead'
import TableRow from '../atoms/TableRow'
import TableHeading from '../atoms/TableHeading'

export default function StatisticsUserTableHead() {
  return (
    <TableHead className="flex flex-col">
      <TableRow className="flex flex-col flex-shrink-0 text-left w-full">
        <TableHeading>
          Applied To:
        </TableHeading>
        <TableHeading>
          Accepted:
        </TableHeading>
        <TableHeading>
          Rejected:
        </TableHeading>
        <TableHeading>
          Response Rate:
        </TableHeading>
      </TableRow>
    </TableHead>
  )
}

