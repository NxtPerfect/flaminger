import React from 'react'
import Image from 'next/image'
import LinkButton from './LinkButton'

type Props = {
  id: number
  title: string
  logoPath: string
  company: string
  acceptanceRate: number
  requirements?: { language: string, minimumExperienceInYears: number }[]
  isClosed: boolean
}

export default function JobOffer({ id, title, logoPath, company, acceptanceRate, requirements, isClosed }: Props) {
  const offerState = "new";
  let linkText;
  let statusText;
  let isReject = false;
  let isAccepted = false;
  let isApplied = false;
  switch (offerState) {
    case "rejected":
      statusText = "Rejected";
      linkText = "Reapply";
      isReject = true;
      break;
    case "accepted":
      statusText = "Accepted!";
      linkText = "";
      isAccepted = true;
      break;
    case "applied":
      statusText = "Your application is being reviewed...";
      linkText = "";
      isApplied = true;
      break;

    default:
      linkText = "Apply";
      break;
  }
  return (
    <div className="flex flex-col bg-neutral-900 rounded-md p-4 px-8">
      <span className="flex flex-row gap-2">
        <h3>{title}</h3>
        {isReject &&
          <span>
            <span className="text-neutral-600 select-none">{statusText}</span>
            <LinkButton type="alt" href={`/profile/offer/${id}`}>Check Reason</LinkButton>
          </span>}
        {isAccepted &&
          <span>
            <span className="text-green-600 select-none">{statusText}</span>
          </span>}
        {isApplied &&
          <span>
            <span className="text-neutral-600 select-none">{statusText}</span>
          </span>}
      </span>
      <span className="mt-4 flex flex-row gap-2">
        <Image src={logoPath || "/companies/logos/small/test.png"} alt="Picture of a company" width={25} height={25} quality={50} />
        <span>{company}</span>
        <span className={acceptanceRate > 50 ? "text-green-500" : "text-red-500"}>{acceptanceRate || 0}%</span>
      </span>
      <span className="mt-8 flex flex-row items-center justify-between">
        <span className="flex flex-row gap-2 align-middle items-center">
          {requirements.map(({ language, minimumExperienceInYears }, index) => {
            return <div key={index} className="rounded-md bg-neutral-800 px-1 self-center">
              {`${language.toUpperCase()} > ${minimumExperienceInYears} years`}
            </div>
          })}
        </span>
        {linkText &&
          <span className="flex flex-row gap-8">
            <LinkButton type="alt" href={`/offer/${id}`}>Read More</LinkButton>
            <LinkButton type="offerLink" href={`/offer/${id}/apply`}>{linkText}</LinkButton>
          </span>}
      </span>
    </div>
  )
}
