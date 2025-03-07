import React from 'react'
import Image from 'next/image'
import LinkButton from '../organisms/LinkButton'
import { FEATURE_FLAG_READ_MORE } from '@/app/lib/definitions'
import ActionButton from '../atoms/ActionButton'
import AcceptanceRatePercentage from '../atoms/AcceptanceRatePercentage'

type Props = {
  id: number
  title: string
  description: string
  logoPath: string
  company: string
  acceptanceRate: number
  requirements?: { tech: { name: string, experience: string }[], langs: { name: string, level: string }[] }
  status: string
  isNotLoggedIn: boolean
  openModalReadMore: (_: number) => void
}

export default function JobOffer({ id, title, description, logoPath, company, acceptanceRate, requirements, status, isNotLoggedIn, openModalReadMore }: Props) {
  let linkText;
  let statusText;
  let isReject = false;
  let isAccepted = false;
  let isApplied = false;
  switch (status) {
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
    case "in progress":
      statusText = "Your application is being reviewed...";
      linkText = "";
      isApplied = true;
      break;

    default:
      linkText = "Apply";
      break;
  }

  return (
    <div className="flex flex-col bg-neutral-200 dark:bg-neutral-900
      rounded-md p-4 px-8 min-w-[35svw]">
      <div className="flex flex-row gap-2">
        <h3 className="text-xl">{title}</h3>
      </div>
      <div className="mt-2 flex flex-row gap-2">
        <Image src={logoPath} alt="Picture of a company" width={25} height={25} quality={50} />
        <span>{company}</span>
        <AcceptanceRatePercentage acceptanceRate={acceptanceRate} />
      </div>
      <span className="mt-4 max-w-[50ch] line-clamp-3 text-ellipsis text-black dark:text-neutral-300">
        {description.substring(0, 180)}
      </span>
      <div className="mt-4 flex flex-row gap-2 items-center justify-between">
        <div className="flex flex-row gap-2 align-middle items-center">
          {requirements?.tech &&
            requirements.tech.map(({ name: name, experience: experience }, index) => {
              return <div key={index} className="rounded-md bg-neutral-600
              text-white dark:bg-neutral-200 dark:text-black px-2 py-1
              self-center">
                {`${name.charAt(0).toUpperCase() + name.slice(1)} > ${experience} years`}
              </div>
            })}
          {requirements?.langs &&
            requirements.langs.map(({ name: name, level: level }, index) => {
              return <div key={index} className="rounded-md bg-neutral-600
              text-white dark:bg-neutral-200 dark:text-black px-2 py-1
              self-center">
                {`${name.charAt(0).toUpperCase() + name.slice(1)} > ${level}`}
              </div>
            })}
        </div>
        {
          !isNotLoggedIn && linkText &&
          <div className="flex flex-row gap-8 items-center">
            {FEATURE_FLAG_READ_MORE &&
              <ActionButton variant="alt" onClick={() => openModalReadMore(id)}>
                Read More
              </ActionButton>
            }
            <LinkButton className="h-fit" variant="offerLink" href={`/offer/${id}/apply`}>
              {linkText}
            </LinkButton>
          </div>
        }
        {!isNotLoggedIn && isReject &&
          <div className="flex flex-row gap-8 items-center">
            <span className="text-neutral-600 select-none">
              {statusText}
            </span>
            <LinkButton variant="alt" href={`/profile`}>
              Check Reason
            </LinkButton>
          </div>}
        {!isNotLoggedIn && isAccepted &&
          <div className="flex flex-row gap-8 items-center">
            <span className="text-green-600 select-none">
              {statusText}
            </span>
          </div>}
        {!isNotLoggedIn && isApplied &&
          <div className="flex flex-row gap-8 items-center">
            <span className="text-neutral-600 select-none">
              {statusText}
            </span>
          </div>}
        {isNotLoggedIn &&
          <LinkButton variant="offerLink" href={`/login`}>
            Signin
          </LinkButton>
        }
      </div>
    </div>
  )
}
