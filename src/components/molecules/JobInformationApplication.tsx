import React from 'react'

type Props = {
  job: {
    id: number
    title: string
    description: string
    isClosed: boolean | null
    createdAt: Date
    byCompanyId: number
  }
}

export default function JobInformationApplication({ job }: Props) {
  return (
    <>
      <div>
        {job.title}
      </div>
      <div className="w-[40ch]">
        {job.description}
      </div>
    </>
  )
}

