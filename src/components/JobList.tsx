"use client"
import React, { useEffect, useState } from 'react'
import JobOffer from './JobOffer'

type Offer = {
  id: number
  title: string
  imagePath: string
  company: string
  requirements: Array<Requirement>
  state: "new" | "applied" | "accepted" | "rejected"
}

type Requirement = {
  languages: string
  minimumExperienceInYears: number
}

export default function JobList(props: {}) {
  const [offers, setOffers] = useState<Array<Offer>>();
  const acceptanceRates: Array<number> = [];

  useEffect(() => {
    console.log("Sent request")
    async () => {
    await fetch('/api/offers')
    .then((res) => setOffers(res.data))
    // for each copmany get acceptance rate
  }}, [])

  return (
    <ul className="flex flex-col gap-4 px-4">
      {offers && offers!.map((offer: Offer) => {
        return (
        <li>
          <JobOffer id={offer.id} title={offer.title} imagePath={offer.imagePath} company={offer.company} acceptanceRate={acceptanceRates[offer.company]} requirements={offer.requirements} offerState={offer.state} />
        </li>
        )
      })}
      <li>
        <JobOffer id={2} title="Easy to get offer" imagePath="/companies/logos/small/test.png" company="Samalik" acceptanceRate={73.12} requirements={[{ language: "html", minimumExperienceInYears: 1 }, { language: "css", minimumExperienceInYears: 1 }, { language: "js", minimumExperienceInYears: 1 }]} offerState={"new"} />
      </li>
      <li>
        <JobOffer id={3} title="Accepted offer" imagePath="/companies/logos/small/test.png" company="Bedun" acceptanceRate={5.22} requirements={[{ language: "asm", minimumExperienceInYears: 1 }]} offerState={"accepted"} />
      </li>
      <li>
        <JobOffer id={4} title="In progress offer" imagePath="/companies/logos/small/test.png" company="Pakuk" acceptanceRate={23.12} requirements={[{ language: "react", minimumExperienceInYears: 10 }]} offerState={"applied"} />
      </li>
    </ul>
  )
}
