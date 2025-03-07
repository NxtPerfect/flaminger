import React from 'react'
import { ModalData } from '../organisms/JobList'
import CloseButton from '../atoms/CloseButton'
import AcceptanceRatePercentage from '../atoms/AcceptanceRatePercentage'
import Image from 'next/image'
import LinkButton from '../organisms/LinkButton'

type Props = {
  data: ModalData | undefined
  onClick: (_: number) => void
}

export default function ModalReadMore({ data, onClick }: Props) {
  return (
    <div className="fixed left-0 top-0 z-50 backdrop-blur-sm
      bg-neutral-800/20 w-full h-full transition duration-1000 animate-fade-in
      flex flex-col justify-center items-center"
    >
      <div className="flex flex-col rounded-md w-[50%] max-h-[50%] bg-neutral-200
        dark:bg-neutral-800">
        <div className="flex justify-self-start self-end p-2">
          <CloseButton onClick={() => onClick(-1)} />
        </div>
        <div className="grid grid-cols-3">
          <div className="flex flex-col p-4 gap-4 col-span-2">
            <div className="flex flex-row gap-2">
              <p className="text-xl font-bold">
                {data?.title}
              </p>
              <p className={data?.status === "new" ? "text-green-600"
                : `text-neutral-600`}>
                {data?.status}
              </p>
            </div>
            <div className="bg-orange-600/80 h-[.1rem] w-full"></div>
            <p className="text-justify text-pretty">
              {data?.description}
            </p>
            <LinkButton variant="offerLink" href={`/offer/${data?.id}/apply`}
              className="w-fit self-end">
              Apply
            </LinkButton>
          </div>
          <div className="flex flex-col p-4 gap-6">
            <Image src={data?.logoPath ?? "/companies/logos/small/b.jpg"}
              alt="company logo" width={100} height={100} />
            <div className="flex flex-row gap-4 items-center text-lg">
              <p>
                {data?.companyName ?? "No company name"}
              </p>
              <AcceptanceRatePercentage
                acceptanceRate={
                  Number.parseFloat(data?.acceptanceRate ?? "0")
                } />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

