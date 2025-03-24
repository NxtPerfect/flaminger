"use client"
import React, { useEffect, useState } from 'react'
import { HumanLanguage, Offer, OfferWithCompanyInfo, Technology, UserApplications } from '@/app/lib/definitions';
import { useParams } from 'next/navigation';
import SkeletonJobOffer from '../placeholders/SkeletonJobOffer';
import JobOffer from '../molecules/JobOffer';
import ModalReadMore from '../molecules/ModalReadMore';
import { useUserSkills } from '@/hooks/useUserSkills';
import { useOffers } from '@/hooks/useOffers';

type Props = {
  isNotLoggedIn: boolean
}

type JobsToUsersTable = {
  id: number
  userId: number
  jobId: number
  isApplied: boolean
  isApplicationInProgress: boolean
  isAccepted: boolean
  rejectionReason: string
}


export type ModalData = {
  id: number
  title: string
  description: string
  logoPath: string
  acceptanceRate: string
  requirements: Requirements
  status: string
  isNotLoggedIn: boolean
  companyName: string
}

type Requirements = {
  tech: Technology[]
  langs: HumanLanguage[]
}

export default function JobList({ isNotLoggedIn }: Props) {
  const [isOpenModalReadMore, setIsOpenModalReadMore] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData>();
  const params = useParams<{ offset: string }>();
  const { skills } = useUserSkills();
  const { isLoading, setOffset, offers, technologies, humanLanguages } = useOffers();

  useEffect(() => {
    setOffset(() => Number.parseInt(params.offset));
  })

  function openModalReadMore(offerId: number) {
    if (isOpenModalReadMore) {
      setIsOpenModalReadMore(false);
    }
    if (offerId === -1)
      return;
    setIsOpenModalReadMore(true);
    const modalData = getModalDataFromOfferId(offerId);
    setModalData(modalData);
  }

  function getModalDataFromOfferId(offerId: number) {
    const offerFullInfo = offers.filter((o) => o.jobsTable.id === offerId)[0];

    const tech = technologies.filter(
      (t) =>
        t.jobId === offerFullInfo.jobsTable.id
    )[0] ?? [];
    const langs = humanLanguages.filter(
      (l) =>
        l.jobId === offerFullInfo.jobsTable.id
    )[0] ?? [];

    const status = getOfferStatus(offerFullInfo.jobsToUsersTable ?? -1,
      offerFullInfo.jobsTable);

    const modalData: ModalData = {
      id: offerFullInfo.jobsTable.id,
      title: offerFullInfo.jobsTable.title,
      description: offerFullInfo.jobsTable.description,
      logoPath: `/companies/logos/small/${offerFullInfo.companiesTable.name.toLowerCase()}.jpg`,
      acceptanceRate: offerFullInfo.companiesTable.acceptanceRate.toFixed(2),
      requirements:
      {
        tech: tech.tech,
        langs: langs.langs
      },
      status: status,
      isNotLoggedIn: isNotLoggedIn,
      companyName: offerFullInfo.companiesTable.name
    };

    return modalData;
  }

  function getOfferStatus(applicationStatus: JobsToUsersTable, offer: Offer) {
    return applicationStatus.jobId === offer.id ? getStatus(applicationStatus) : "new";
  }

  function getStatus(applicationStatus: Partial<UserApplications>) {
    if (applicationStatus.isAccepted) return "accepted";
    if (!applicationStatus.isApplicationInProgress && !applicationStatus.isAccepted) return "rejected";
    if (applicationStatus.isApplied && applicationStatus.isApplicationInProgress) return "in progress";
    return "new";
  }

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
      {isOpenModalReadMore &&
        <ModalReadMore data={modalData} onClick={openModalReadMore} />}
      {offers && offers!.map((offerFullInfo: OfferWithCompanyInfo) => {
        const offer = offerFullInfo.jobsTable;
        const company = offerFullInfo.companiesTable;
        const applicationStatus = offerFullInfo.jobsToUsersTable ?? -1;
        const status = getOfferStatus(applicationStatus, offer);

        const tech = technologies.filter(
          (t) =>
            t.jobId === offer.id && t.tech
        )[0].tech;

        const langs = humanLanguages.filter(
          (l) =>
            l.jobId === offer.id && l.langs
        )[0].langs;

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
                  tech: tech ?? [],
                  langs: langs ?? []
                }
              }
              skills={skills}
              status={status ?? "new"}
              isNotLoggedIn={isNotLoggedIn}
              openModalReadMore={openModalReadMore}
            />
          </li>
        )
      })}
    </ul>
  )
}
