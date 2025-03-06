import { SelectHumanLanguagesToUsers, SelectTechnologiesToUsers, SelectUser } from '@/db/schema'
import React from 'react'
import ProfilePicture from '../atoms/ProfilePicture'
import UserTechnologies from '../organisms/UserTechnologies'
import UserLanguages from '../organisms/UserLanguages'

type Props = {
  candidate: {
    personalInformation: SelectUser
    technologies: SelectTechnologiesToUsers[]
    humanLanguages: SelectHumanLanguagesToUsers[]
  }
}

export default function CandidateInformationApplication({ candidate }: Props) {
  return (
    <div className="grid grid-cols-2 dark:text-white bg-neutral-400
      dark:bg-neutral-800 p-8 mt-8 justify-items-center items-stretch">
      <div>
        <div className="w-fit">
          <ProfilePicture />
        </div>
        <div className="mt-8 flex flex-col w-full items-start justify-self-center gap-2">
          <span className="text-2xl font-semibold w-full gap-2">
            {`${candidate.personalInformation.firstname} 
            ${candidate.personalInformation.surname}`}
          </span>
          <span>{candidate.personalInformation.city}</span>
        </div>
      </div>
      <div className="self-end">
        <div>
          <UserTechnologies technologies={candidate.technologies} addMore={false} />
        </div>
        <div className="mt-4">
          <UserLanguages languages={candidate.humanLanguages} addMore={false} />
        </div>
      </div>
    </div>
  )
}

