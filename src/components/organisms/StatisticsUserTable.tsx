
import React from 'react'
import Table from '../atoms/Table'
import { StatisticsForUserApplications } from '@/app/lib/definitions'
import StatisticsUserTableHead from '../molecules/StatisticsUserTableHead'
import StatisticsUserTableBody from '../molecules/StatisticsUserTableBody'

type Props = {
  statistics?: StatisticsForUserApplications
}

export default function StatisticsUserTable({ statistics }: Props) {
  return (
    <Table className="flex flex-row w-full">
      <StatisticsUserTableHead />
      <StatisticsUserTableBody statistics={statistics} />
    </Table>
  )
}

