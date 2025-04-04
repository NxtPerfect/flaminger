import React from 'react'
import Image from 'next/image'
import LinkButton from '../organisms/LinkButton'
import { ContractType, FEATURE_FLAG_READ_MORE, HumanLanguage, JobStatus, JobType, Technology, WorkhourType } from '@/app/lib/definitions'
import ActionButton from '../atoms/ActionButton'
import AcceptanceRatePercentage from '../atoms/AcceptanceRatePercentage'
import LlmPrompt from './LlmPrompt'
import JobSalary from '../atoms/JobSalary'
import JobTypeInfo from '../atoms/JobTypeInfo'
import WorkhourTypeInfo from '../atoms/WorkhourTypeInfo'
import ContractTypeInfo from '../atoms/ContractTypeInfo'
import CityInfo from '../atoms/CityInfo'

type Props = {
  id: number
  title: string
  description: string
  logoPath: string
  company: string
  acceptanceRate: number
  requirements?: { tech: { name: string, experience: string }[], langs: { name: string, level: string }[] }
  skills?: { technologies: Technology[], humanLanguages: HumanLanguage[] }
  salary: { min: number, max: number }
  jobType: JobType
  workhourType: WorkhourType
  contractType: ContractType
  city: string
  status: JobStatus
  isNotLoggedIn: boolean
  openModalReadMore: (_: number) => void
}

export default function JobOffer({
  id,
  title,
  description,
  logoPath,
  company,
  acceptanceRate,
  requirements,
  skills,
  salary,
  jobType,
  workhourType,
  contractType,
  city,
  status,
  isNotLoggedIn,
  openModalReadMore
}: Props) {
  const statusConfig: {
    [key in JobStatus | "default"]: {
      statusText: string;
      linkText: string;
      isAccepted: boolean;
      isReject: boolean;
      isApplied: boolean;
    }
  } = {
    rejected: {
      statusText: "Rejected",
      linkText: "Reapply",
      isAccepted: false,
      isReject: true,
      isApplied: false,
    },
    accepted: {
      statusText: "Accepted!",
      linkText: "",
      isAccepted: true,
      isReject: false,
      isApplied: false,
    },
    inProgress: {
      statusText: "Your application is being reviewed...",
      linkText: "",
      isReject: false,
      isAccepted: false,
      isApplied: true,
    },
    new: {
      statusText: "",
      linkText: "Apply",
      isAccepted: false,
      isReject: false,
      isApplied: false,
    },
    default: {
      statusText: "",
      linkText: "Apply",
      isAccepted: false,
      isReject: false,
      isApplied: false,
    }
  }

  const currentStatusConfig = statusConfig[status] || statusConfig.default;

  const formattedDescription = formatDescription(description);

  function formatDescription(description: string) {
    const shortenedDescription = description.slice(0, 180);
    const elipsisDescription = description.length > 180 ?
      shortenedDescription + "..."
      :
      shortenedDescription;
    return elipsisDescription;
  }

  return (
    <div className={`flex flex-col bg-neutral-200 dark:bg-neutral-900
      rounded-md p-4 px-8 min-w-[75svw] md:min-w-[35svw] max-w-[85svw] md:max-w-[55svw]`}>
      <div className="flex flex-row gap-2">
        <h3 className="text-xl">{title}</h3>
      </div>
      <div className="flex flex-col gap-2">
        <div className="mt-2 flex flex-row justify-between">
          <div className="flex flex-row gap-4">
            <div className="flex flex-row gap-2">
              <Image src={logoPath} alt="Picture of a company" width={25} height={25} quality={50} />
              <span>{company}</span>
            </div>
            <AcceptanceRatePercentage acceptanceRate={acceptanceRate} />
          </div>
          <JobSalary salary={salary} />
        </div>
        <div className="flex flex-row gap-6">
          <JobTypeInfo jobType={jobType} />
          <WorkhourTypeInfo workhourType={workhourType} />
          <ContractTypeInfo contractType={contractType} />
          <CityInfo city={city} />
        </div>
      </div>
      <span className={`mt-4 min-w-[75svw] md:min-w-[35svw]
max-w-[85svw] md:max-w-[55svw] line-clamp-3
text-ellipsis text-black dark:text-neutral-300`}>
        {formattedDescription}
      </span>
      <LlmPrompt
        title={title}
        company={company}
        description={description}
        requirements={requirements}
        skills={skills} />
      <div className="mt-4 flex flex-row gap-4 items-center justify-start">
        <div className={`flex flex-1 flex-row flex-wrap gap-2
overflow-hidden max-h-[3.5lh] hover:max-h-fit transition-all duration-1000 ease-in-out`}>
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
      </div>
      <div className="mt-4 flex flex-col-reverse md:flex-row gap-4 items-center justify-end">
        {!isNotLoggedIn && currentStatusConfig.linkText &&
          <div className="flex flex-row gap-8 items-center">
            {FEATURE_FLAG_READ_MORE &&
              <ActionButton variant="alt" onClick={() => openModalReadMore(id)}>
                Read More
              </ActionButton>
            }
            <LinkButton className="h-fit" variant="offerLink" href={`/offer/${id}/apply`}>
              {currentStatusConfig.linkText}
            </LinkButton>
          </div>}
        {!isNotLoggedIn && currentStatusConfig.isReject &&
          <div className="flex flex-row gap-8 items-center">
            <span className="text-neutral-600 select-none">
              {currentStatusConfig.statusText}
            </span>
            <LinkButton variant="alt" href={`/profile`}>
              Check Reason
            </LinkButton>
          </div>}
        {!isNotLoggedIn && currentStatusConfig.isAccepted &&
          <div className="flex flex-row gap-8 items-center">
            <span className="text-green-600 select-none">
              {currentStatusConfig.statusText}
            </span>
          </div>}
        {!isNotLoggedIn && currentStatusConfig.isApplied &&
          <div className="flex flex-row gap-8 items-center">
            <span className="text-neutral-600 select-none">
              {currentStatusConfig.statusText}
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
