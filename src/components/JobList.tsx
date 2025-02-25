"use client"
import React, { useEffect, useState } from 'react'
import JobOffer from './JobOffer'
import { OfferWithCompanyInfo, UserApplications } from '@/app/lib/definitions';
import SkeletonJobOffer from './placeholders/SkeletonJobOffer';
import { useParams } from 'next/navigation';

type Props = {
  isNotLoggedIn: boolean
}

type techRequirement = {
  jobId: number,
  tech: {
    name: string,
    experience: string
  }[]
}

type langRequirement = {
  jobId: number,
  langs: {
    name: string,
    level: string
  }[]
}

export default function JobList({ isNotLoggedIn }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [offers, setOffers] = useState<OfferWithCompanyInfo[]>([]);
  const [technology, setTechnology] = useState<techRequirement[]>([]);
  const [humanLanguages, setHumanLanguages] = useState<langRequirement[]>([]);
  const { offset } = useParams<{ offset: string }>();

  function getStatus(applicationStatus: Partial<UserApplications>) {
    if (applicationStatus.isAccepted) return "accepted";
    if (!applicationStatus.isApplicationInProgress && !applicationStatus.isAccepted) return "rejected";
    if (applicationStatus.isApplied && applicationStatus.isApplicationInProgress) return "in progress";
    return "new";
  }

  useEffect(() => {
    setIsLoading(true);
    const fetchOffers = async () => {
      const parsedOffset = Number.parseInt(offset) ?? 1;
      await fetch(`/api/offers/${parsedOffset}`)
        .then(async (res) => {
          const responseJson = await res.json();
          setOffers(responseJson.offers);
          setTechnology(responseJson.tech);
          setHumanLanguages(responseJson.langs);
          setIsLoading(false);
        })
    }
    fetchOffers();
  }, [offset])

  return (
    <ul className="flex flex-col gap-4 px-4">
      {isLoading &&
        <>
          <SkeletonJobOffer />
          <SkeletonJobOffer />
          <SkeletonJobOffer />
          <SkeletonJobOffer />
          <SkeletonJobOffer />
          <SkeletonJobOffer />
        </>
      }
      {offers && offers!.map((offerFullInfo: OfferWithCompanyInfo) => {
        const offer = offerFullInfo.jobsTable;
        const company = offerFullInfo.companiesTable;
        let status;
        let applicationStatus;
        if (offerFullInfo.jobsToUsersTable) {
          applicationStatus = offerFullInfo.jobsToUsersTable;
          status = applicationStatus.jobId === offer.id ? getStatus(applicationStatus) : "new";
        }
        const tech: { jobId: number, tech: { name: string, experience: string }[] }[] = technology.filter(
          (t) =>
            t.jobId === offer.id
        );
        const langs: { jobId: number, langs: { name: string, level: string }[] }[] = humanLanguages.filter(
          (l) =>
            l.jobId === offer.id
        );
        return (
          <li key={offer.id}>
            <JobOffer
              id={offer.id}
              title={offer.title}
              description={offer.description}
              logoPath={`/companies/logos/small/${company.name.toLowerCase()}.jpg`}
              company={company.name}
              acceptanceRate={company.acceptanceRate}
              requirements={
                {
                  tech: tech[0]?.tech ?? [],
                  langs: langs[0]?.langs ?? []
                }
              }
              status={status ?? "new"}
              isNotLoggedIn={isNotLoggedIn}
            />
          </li>
        )
      })}
    </ul>
  )
}
