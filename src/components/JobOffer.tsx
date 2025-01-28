import React from 'react'
import Image from 'next/image'
import LinkButton from './LinkButton'

type Props = {
  id: string
  title: string
  imagePath: string
  company: string
  acceptanceRate: number
  requirements: { language: string, minimumExperienceInYears: number }[]
  offerState: "unapplied" | "inProgress" | "accepted" | "rejected"
}

export default function JobOffer({ id, title, imagePath, company, acceptanceRate, requirements, offerState }: Props) {
  if (offerState === "rejected") {
    return (
      <div className="flex flex-col bg-neutral-900 rounded-md p-4 px-8">
        <span className="flex flex-row gap-2">
          <h3>{title}</h3>
          <span>
            <span className="text-neutral-600 select-none">Rejected</span>
            <LinkButton type="alt" href={`/profile/offer/${id}`}>Check Reason</LinkButton>
          </span>
        </span>
        <span className="mt-4 flex flex-row gap-2">
          <Image src={imagePath} alt="Picture of a company" width={25} height={25} quality={50} />
          <span>{company}</span>
          <span className={acceptanceRate > 50 ? "text-green-500" : "text-red-500"}>{acceptanceRate}%</span>
        </span>
        <span className="mt-8 flex flex-row items-center justify-between">
          <span className="flex flex-row gap-2 align-middle items-center">
            {requirements.map(({ language, minimumExperienceInYears }, index) => {
              return <div key={index} className="rounded-md bg-neutral-800 px-1 self-center">
                {`${language.toUpperCase()} > ${minimumExperienceInYears} years`}
              </div>
            })}
          </span>
          <span className="flex flex-row gap-8">
            <LinkButton type="alt" href={`/offer/${id}`}>Read More</LinkButton>
            <LinkButton type="offerLink" href={`/offer/${id}/apply`}>Re apply</LinkButton>
          </span>
        </span>
      </div>
    )
  }

  if (offerState === "accepted") {
    return (
      <div className="flex flex-col bg-neutral-900 rounded-md p-4 px-8">
        <span className="flex flex-row gap-2">
          <h3>{title}</h3>
          <span>
            <span className="text-green-600 select-none">Accepted!</span>
          </span>
        </span>
        <span className="mt-4 flex flex-row gap-2">
          <Image src={imagePath} alt="Picture of a company" width={25} height={25} quality={50} />
          <span>{company}</span>
          <span className={acceptanceRate > 50 ? "text-green-500" : "text-red-500"}>{acceptanceRate}%</span>
        </span>
        <span className="mt-8 flex flex-row items-center justify-between">
          <span className="flex flex-row gap-2 align-middle items-center">
            {requirements.map(({ language, minimumExperienceInYears }, index) => {
              return <div key={index} className="rounded-md bg-neutral-800 px-1 self-center">
                {`${language.toUpperCase()} > ${minimumExperienceInYears} years`}
              </div>
            })}
          </span>
        </span>
      </div>
    )
  }

  if (offerState === "inProgress") {
    return (
      <div className="flex flex-col bg-neutral-900 rounded-md p-4 px-8">
        <span className="flex flex-row gap-2">
          <h3>{title}</h3>
          <span>
            <span className="text-neutral-600 select-none">Your application is being reviewed...</span>
          </span>
        </span>
        <span className="mt-4 flex flex-row gap-2">
          <Image src={imagePath} alt="Picture of a company" width={25} height={25} quality={50} />
          <span>{company}</span>
          <span className={acceptanceRate > 50 ? "text-green-500" : "text-red-500"}>{acceptanceRate}%</span>
        </span>
        <span className="mt-8 flex flex-row items-center justify-between">
          <span className="flex flex-row gap-2 align-middle items-center">
            {requirements.map(({ language, minimumExperienceInYears }, index) => {
              return <div key={index} className="rounded-md bg-neutral-800 px-1 self-center">
                {`${language.toUpperCase()} > ${minimumExperienceInYears} years`}
              </div>
            })}
          </span>
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-neutral-900 rounded-md p-4 px-8">
      <span className="flex flex-row gap-2">
        <h3>{title}</h3>
      </span>
      <span className="mt-4 flex flex-row gap-2">
        <Image src={imagePath} alt="Picture of a company" width={25} height={25} quality={50} />
        <span>{company}</span>
        <span className={acceptanceRate > 50 ? "text-green-500" : "text-red-500"}>{acceptanceRate}%</span>
      </span>
      <span className="mt-8 flex flex-row items-center justify-between">
        <span className="flex flex-row gap-2 align-middle items-center">
          {requirements.map(({ language, minimumExperienceInYears }, index) => {
            return <div key={index} className="rounded-md bg-neutral-800 px-1 self-center">
              {`${language.toUpperCase()} > ${minimumExperienceInYears} years`}
            </div>
          })}
        </span>
        <span className="flex flex-row gap-8">
          <LinkButton type="alt" href={`/offer/${id}`}>Read More</LinkButton>
          <LinkButton type="offerLink" href={`/offer/${id}/apply`}>Apply</LinkButton>
        </span>
      </span>
    </div>
  )
}

