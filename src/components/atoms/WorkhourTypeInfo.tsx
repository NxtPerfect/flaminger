import { WorkhourType } from '@/app/lib/definitions'
import React from 'react'
import FullTimeSvg from '../molecules/FullTimeSvg'
import PartTimeSvg from '../molecules/PartTimeSvg'
import InternshipSvg from '../molecules/InternshipSvg'

export default function WorkhourTypeInfo({ workhourType }: { workhourType: WorkhourType }) {
  const SvgType: { [key in WorkhourType]: React.ReactNode } = {
    full: <FullTimeSvg imageAlt='' />,
    part: <PartTimeSvg imageAlt='' />,
    intern: <InternshipSvg imageAlt='' />
  }
  const WorkhourText: { [key in WorkhourType]: string } = {
    full: "Full-Time",
    part: "Part-Time",
    intern: "Internship",
  }
  return (
    <div className="flex flex-row gap-1">
      {SvgType[workhourType] || <FullTimeSvg imageAlt='' />}
      <span>
        {WorkhourText[workhourType]}
      </span>
    </div>
  )
}

