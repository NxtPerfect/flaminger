"use client"
import React, { useEffect, useState } from 'react'
import JobOffer from './JobOffer'
import { OfferWithCompanyInfo } from '@/app/lib/definitions';
import SkeletonJobOffer from './placeholders/SkeletonJobOffer';

export default function JobList() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [offers, setOffers] = useState<Array<OfferWithCompanyInfo>>();

  function getStatus(applicationStatus: { isAccepted: boolean, isApplicationInProgress: boolean, isApplied: boolean, isClosed: boolean }) {
    if (applicationStatus.isAccepted) return "accepted";
    if (!applicationStatus.isApplicationInProgress && !applicationStatus.isAccepted) return "rejected";
    if (applicationStatus.isClosed) return "closed";
    if (applicationStatus.isApplied && applicationStatus.isApplicationInProgress) return "in progress";
    return "new";
  }

  useEffect(() => {
    console.log("Sent request")
    setIsLoading(true);
    const fetchOffers = async () => {
      await fetch('/api/offers')
        .then(async (res) => {
          const responseJson = await res.json();
          console.log("Companies", responseJson.offers.companies_table);
          setOffers(responseJson.offers);
          setIsLoading(false);
        })
    }
    fetchOffers();
  }, [])

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
        const company = offerFullInfo.companies_table;
        const offer = offerFullInfo.jobs_table;
        let status;
        let applicationStatus;
        if (offerFullInfo.jobs_to_users_table) {
          applicationStatus = offerFullInfo.jobs_to_users_table;
          status = applicationStatus.jobId === offer.id ? getStatus(applicationStatus) : "new";
        }
        return (
          <li key={offer.id}>
            <JobOffer id={offer.id} title={offer.title} description={offer.description} logoPath={`/companies/logos/small/${company.name.toLowerCase()}.jpg`} company={company.name} acceptanceRate={company.acceptanceRate} requirements={[]} isClosed={offer.isClosed} status={status || "new"} rejectionReason={applicationStatus?.rejectionReason || ""} />
          </li>
        )
      })}
    </ul>
  )
}
