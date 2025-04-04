import { JobType } from '@/app/lib/definitions'
import React from 'react'
import StationarySvg from './StationarySvg'
import HybridSvg from './HybridSvg'
import HomeSvg from './HomeSvg'

export default function JobTypeInfo({ jobType }: { jobType: JobType }) {
  const SvgType: { [key in JobType]: React.ReactNode } = {
    stationary: <StationarySvg imageAlt='' />,
    hybrid: <HybridSvg imageAlt='' />,
    remote: <HomeSvg imageAlt='' />
  }
  return (
    <div className="flex flex-row gap-1">
      {SvgType[jobType] || <StationarySvg imageAlt='' />}
      <span>
        {jobType[0].toUpperCase() + jobType.slice(1)}
      </span>
    </div>
  )
}

