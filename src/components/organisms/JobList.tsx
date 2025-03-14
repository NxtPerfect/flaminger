"use client"
import React, { useEffect, useState } from 'react'
import { HumanLanguage, Offer, OfferWithCompanyInfo, Technology, UserApplications } from '@/app/lib/definitions';
import { useParams } from 'next/navigation';
import SkeletonJobOffer from '../placeholders/SkeletonJobOffer';
import JobOffer from '../molecules/JobOffer';
import ModalReadMore from '../molecules/ModalReadMore';
import { useUserSkills } from '@/hooks/useUserSkills';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [offers, setOffers] = useState<OfferWithCompanyInfo[]>([]);
  const [technology, setTechnology] = useState<techRequirement[]>([]);
  const [humanLanguages, setHumanLanguages] = useState<langRequirement[]>([]);
  const [isOpenModalReadMore, setIsOpenModalReadMore] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData>();
  const { offset } = useParams<{ offset: string }>();
  const { skills } = useUserSkills();

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

  function openModalReadMore(offerId: number) {
    console.log("Opened modal with id", offerId);
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
    console.log("Offer filtered", offerFullInfo);

    const tech = technology.filter(
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
        const tech = technology.filter(
          (t) =>
            t.jobId === offer.id
        )[0];
        const langs = humanLanguages.filter(
          (l) =>
            l.jobId === offer.id
        )[0];
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
                  tech: tech?.tech ?? [],
                  langs: langs?.langs ?? []
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
