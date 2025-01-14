import React from 'react'
import JobOffer from './JobOffer'

export default function JobList(props: {}) {
  return (
    <ul className="flex flex-col gap-4 px-4">
      <li>
        <JobOffer id="1" title="Hard to get offer" imagePath="/companies/logos/small/test.png" company="Macrohard" acceptanceRate={21.37} requirements={[{ language: "html", minimumExperienceInYears: 5 }, { language: "css", minimumExperienceInYears: 5 }, { language: "js", minimumExperienceInYears: 3 }, { language: "ts", minimumExperienceInYears: 15 }]} />
      </li>
      <li>
        <JobOffer id="2" title="Easy to get offer" imagePath="/companies/logos/small/test.png" company="Samalik" acceptanceRate={73.12} requirements={[{ language: "html", minimumExperienceInYears: 1 }, { language: "css", minimumExperienceInYears: 1 }, { language: "js", minimumExperienceInYears: 1 }]} />
      </li>
    </ul>
  )
}
