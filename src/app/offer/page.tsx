import { LinkButton } from '@/components/LinkButton'
import React from 'react'
import Image from 'next/image'
import { JobOffer } from '@/app/lib/definitions'

export const OfferPage = ({ offer }: { JobOffer }) => {
  return (
    <div className="flex flex-col bg-neutral-900 rounded-md p-4 px-8">
      <span className="flex flex-row gap-2">
        <h3>{offer.title}</h3>
        <span>
          <span className="text-neutral-600 select-none">Rejected</span>
          <LinkButton type="alt" href={`/profile/offer/${offer.id}`}>Check Reason</LinkButton>
        </span>
      </span>
      <span className="mt-4 flex flex-row gap-2">
        <Image src={offer.imagePath} alt="Picture of a company" width={25} height={25} quality={50} />
        <span>{offer.company}</span>
        <span className={offer.acceptanceRate > 50 ? "text-green-500" : "text-red-500"}>{offer.acceptanceRate}%</span>
      </span>
      <span className="mt-8 flex flex-row items-center justify-between">
        <span className="flex flex-row gap-2 align-middle items-center">
          {offer.requirements.map(({ language, minimumExperienceInYears }: { language: string, minimumExperienceInYears: number }, index: number) => {
            return <div key={index} className="rounded-md bg-neutral-800 px-1 self-center">
              {`${language.toUpperCase()} > ${minimumExperienceInYears} years`}
            </div>
          })}
        </span>
        <span className="flex flex-row gap-8">
          <LinkButton type="offerLink" href={`/offer/${offer.id}/apply`}>Re apply</LinkButton>
        </span>
      </span>
    </div>
  )
}
