import React from 'react'
import TableHead from '../atoms/TableHead'
import TableRow from '../atoms/TableRow'
import TableHeading from '../atoms/TableHeading'

export default function StatisticsUserTableHead() {
  return (
    <TableHead>
      <TableRow className="flex-shrink-0 text-left">
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

