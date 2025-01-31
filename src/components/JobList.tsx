"use client"
import React, { useEffect, useState } from 'react'
import JobOffer from './JobOffer'

type Offer = {
  id: number
  byCompanyId: number
  title: string
  description: string
  // imagePath: string
  company: string
  isClosed: boolean
  // requirements: Array<Requirement>
  // state: "new" | "applied" | "accepted" | "rejected"
}

type Requirement = {
  languages: string
  minimumExperienceInYears: number
}

export type Company = {
  id: number
  name: string
  jobsAccepted: number
  jobsRejected: number
  acceptanceRate: number
}

type OfferWithCompanyInfo = {
  jobs_table: {
    id: number
    byCompanyId: number
    title: string
    description: string
    // imagePath: string
    company: string
    isClosed: boolean
    // requirements: Array<Requirement>
    // state: "new" | "applied" | "accepted" | "rejected"
  },
  companies_table: {
    id: number
    name: string
    jobsAccepted: number
    jobsRejected: number
    acceptanceRate: number
  }
}

export default function JobList() {
  const [offers, setOffers] = useState<Array<OfferWithCompanyInfo>>();

  useEffect(() => {
    console.log("Sent request")
    const fetchOffers = async () => {
      await fetch('/api/offers')
        .then(async (res) => {
          const jason = await res.json();
          console.log("Companies", jason.offers.companies_table);
          setOffers(jason.offers);
        })
    }
    fetchOffers();
  }, [])

  return (
    <ul className="flex flex-col gap-4 px-4">
      {offers && offers!.map((offerFullInfo: OfferWithCompanyInfo) => {
        const company = offerFullInfo.companies_table;
        const offer = offerFullInfo.jobs_table;
        return (
          <li key={offer.id}>
            <JobOffer id={offer.id} title={offer.title} logoPath={`/companies/logos/small/${company.name.toLowerCase()}.png`} company={offer.title} acceptanceRate={company.acceptanceRate} requirements={[]} isClosed={offer.isClosed} />
          </li>
        )
      })}
      <li>
        <JobOffer id={2} title="Easy to get offer" logoPath="/companies/logos/small/test.png" company="Samalik" acceptanceRate={73.12} requirements={[{ language: "html", minimumExperienceInYears: 1 }, { language: "css", minimumExperienceInYears: 1 }, { language: "js", minimumExperienceInYears: 1 }]} isClosed={false} />
      </li>
      <li>
        <JobOffer id={3} title="Accepted offer" logoPath="/companies/logos/small/test.png" company="Bedun" acceptanceRate={5.22} requirements={[{ language: "assembly", minimumExperienceInYears: 1 }]} isClosed={false} />
      </li>
      <li>
        <JobOffer id={4} title="In progress offer" logoPath="/companies/logos/small/test.png" company="Pakuk" acceptanceRate={23.12} requirements={[{ language: "react", minimumExperienceInYears: 10 }]} isClosed={false} />
      </li>
    </ul>
  )
}
