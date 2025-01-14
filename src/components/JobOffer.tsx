import React from 'react'
import Image from 'next/image'
import { LinkButton } from './LinkButton'

type Props = {
  id: string
  title: string
  imagePath: string
  company: string
  acceptanceRate: number
  requirements: { language: string, minimumExperienceInYears: number }[]
}

export default function JobOffer({ id, title, imagePath, company, acceptanceRate, requirements }: Props) {
  return (
    <div className="flex flex-col bg-neutral-900 rounded-md p-4 px-8">
      <span className="flex flex-row gap-2">
        <Image src={imagePath} alt="Picture of a company" width={25} height={25} quality={50} />
        <h3>{title}</h3>
      </span>
      <span className="mt-4 flex flex-row gap-2">
        <span>{company}</span>
        <span className={acceptanceRate > 50 ? "text-green-500" : "text-red-500"}>{acceptanceRate}%</span>
      </span>
      <span className="mt-8 flex flex-row items-center">
        <span className="flex flex-row gap-2 align-middle items-center">
          {requirements.map(({ language, minimumExperienceInYears }, index) => {
            return <div key={index} className="rounded-md bg-neutral-800 px-1 self-center">
              {`${language.toUpperCase()} > ${minimumExperienceInYears} years`}
            </div>
          })}
        </span>
        <LinkButton type="offerLink" href={`/offer/${id}`}>Details</LinkButton>
        <LinkButton type="offerLink" href={`/offer/${id}/apply`}>Apply</LinkButton>
      </span>
    </div>
  )
}

