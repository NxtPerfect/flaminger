import { SelectHumanLanguagesToUsers, SelectTechnologiesToUsers, SelectUser } from '@/db/schema'
import React from 'react'

type Props = {
  candidate: {
    personalInformation: SelectUser
    technologies: SelectTechnologiesToUsers[]
    humanLanguages: SelectHumanLanguagesToUsers[]
  }
}

export default function CandidateInformationApplication({ candidate }: Props) {
  return (
    <div className="bg-neutral-800 p-8 mt-8">
      <div>
        {candidate.personalInformation.firstname} {candidate.personalInformation.surname}
      </div>
      <div>
        {candidate.personalInformation.city}
      </div>
      <div>
        Technologies:
        <ul>
          {candidate.technologies.map((tech: SelectTechnologiesToUsers, index: number) => {
            return (
              <li key={index}>
                {tech.name} {tech.experience}y
              </li>);
          }
          )}
        </ul>
      </div>
      <div>
        Languages:
        <ul>
          {candidate.humanLanguages.map((lang: SelectHumanLanguagesToUsers, index: number) => {
            return (
              <li key={index}>
                {lang.name} {lang.level}
              </li>);
          }
          )}
        </ul>
      </div>
    </div>
  )
}

