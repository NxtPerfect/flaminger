import { HumanLanguage, Technology } from '@/app/lib/definitions'
import React from 'react'
import UserTechnologies from '../organisms/UserTechnologies'
import UserLanguages from '../organisms/UserLanguages'

type Props = {
  job: {
    id: number
    title: string
    description: string
    isClosed: boolean | null
    createdAt: Date
    byCompanyId: number
  }
  tech: Technology[]
  langs: HumanLanguage[]
}

export default function JobInformationApplication({ job, tech, langs }: Props) {
  return (
    <div className="text-black dark:text-white bg-neutral-400
      dark:bg-neutral-800 p-8 w-full grid grid-cols-2 gap-4">
      <div>
        <div className="text-xl font-bold">
          {job.title}
        </div>
        <div className="mt-4 text-justify text-pretty max-w-[80ch]">
          {job.description}
        </div>
      </div>
      <div className="flex flex-col self-end w-full gap-4">
        <UserTechnologies technologies={tech} addMore={false} />
        <UserLanguages languages={langs} addMore={false} />
      </div>
    </div>
  )
}

