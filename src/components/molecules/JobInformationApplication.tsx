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
      <div>
        {job.description}
      </div>
    </>
  )
}

