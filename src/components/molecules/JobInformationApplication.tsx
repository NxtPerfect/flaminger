import { HumanLanguage, Technology } from '@/app/lib/definitions'
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
  tech: Technology[]
  langs: HumanLanguage[]
}

export default function JobInformationApplication({ job, tech, langs }: Props) {
  return (
    <div className="text-black dark:text-white bg-neutral-400 dark:bg-neutral-800 p-8">
      <div>
        {job.title}
      </div>
      <div className="w-[40ch]">
        {job.description}
      </div>
      <div>
        <ul>
          {tech && tech.map((t, i) => {
            return (
              <li key={i}>
                {t.name} {t.experience}
              </li>
            )
          })}
        </ul>
      </div>
      <div>
        <ul>
          {langs && langs.map((l, i) => {
            return (
              <li key={i}>
                {l.name} {l.level}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

