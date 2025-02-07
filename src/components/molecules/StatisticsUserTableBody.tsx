import React from 'react'
import TableBody from '../atoms/TableBody'
import TableRow from '../atoms/TableRow'
import TableColumn from '../atoms/TableColumn'
import { StatisticsForUserApplications } from '@/app/lib/definitions'

type Props = {
  statistics?: StatisticsForUserApplications
}

export default function StatisticsUserTableBody({ statistics }: Props) {
  return (
    <TableBody className="flex flex-col w-1/3">
      <TableRow className="flex flex-col w-full">
        <TableColumn>
          {statistics?.total ?? 0}
        </TableColumn>
        <TableColumn>
          {statistics?.accepted ?? 0}
        </TableColumn>
        <TableColumn>
          {statistics?.rejected ?? 0}
        </TableColumn>
        <TableColumn>
          {statistics?.responseRate ?? 0.00}%
        </TableColumn>
      </TableRow>
    </TableBody>
  )
}

