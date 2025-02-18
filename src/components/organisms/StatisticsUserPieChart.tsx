
import React from 'react'
import { StatisticsForUserApplications } from '@/app/lib/definitions'
import PieChartStatistics from '../molecules/PieChart'

type Props = {
  statistics?: StatisticsForUserApplications
}

export default function StatisticsUserPieChart({ statistics }: Props) {
  return (
    <>
      <PieChartStatistics statistics={statistics} />
    </>
  )
}

