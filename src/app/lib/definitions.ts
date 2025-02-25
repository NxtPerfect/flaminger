import { Dispatch, SetStateAction } from "react"

export type JobOffer = {
  id: string
  title: string
  imagePath: string
  company: string
  acceptanceRate: number
  requirements: { language: string, minimumExperienceInYears: number }[]
  offerState: "unapplied" | "inProgress" | "accepted" | "rejected"
  description: string
  alternativeApplicationLink?: string
}

export type SessionPayload = {
  userId: string
  isEmployer: boolean
  expiresAt: Date
}

export type RequiredTechnology = {
  name: string
  minimumYearsOfExperience: number
}

export type OfferWithCompanyInfo = {
  jobsTable: Offer
  companiesTable: Company
  jobsToUsersTable: UserApplications
  technologiesRequirementsToJobsTable: { name: string, experience: string, jobId: number }[]
  humanLanguagesRequirementsToJobsTable: { name: string, level: HumanLanguage["level"], jobId: number }[]
}

export type Offer = {
  id: number
  title: string
  description: string
  byCompanyId: number
  company: string
  isClosed?: boolean
  createdAt?: Date
  // requirements: Array<Requirement>
  // state: "new" | "applied" | "accepted" | "rejected"
}

export type StatisticsForUserApplicationsFromDatabase = {
  accepted: { count: number }
  rejected: { count: number }
  total: { count: number }
  responseRate?: string
}

export type StatisticsForUserApplications = {
  accepted: number
  rejected: number
  total: number
  responseRate: string
}

export type PendingApplication = {
  jobsTable: Partial<Offer>
  company: string
}

export type DatabaseCompletedApplication = {
  jobsTable: Offer
  company: string
  isAccepted: boolean
  rejectionReason: string
}

export type CompletedApplication = {
  id: number
  company: string
  title: string
  description: string
  byCompanyId: number
  isAccepted: boolean
  rejectionReason: string
}

export type Company = {
  id: number
  name: string
  jobsAccepted: number
  jobsRejected: number
  acceptanceRate: number
}

export type UserApplications = {
  id: number
  userId: number
  jobId: number
  isApplied: boolean
  isApplicationInProgress: boolean
  isAccepted: boolean
  rejectionReason: string
}

export type User = {
  id: number
  firstname: string
  surname: string
  email: string
  password: string
  mailingConsent: boolean
  isEmployer: boolean
  city?: string
}

export type SvgProps = {
  className?: string
  imageAlt?: string
}

export type PickerProps = {
  whichRadioIsActive: number
  setWhichRadioIsActiveAction: Dispatch<SetStateAction<number>>
}

export type HumanLanguage = {
  name: string
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Native" | "H1" | "H2" | string
}

export type Technology = {
  name: string
  experience: number
}

export const HUMAN_LANGUAGE_LEVELS = [
  "a1",
  "a2",
  "b1",
  "b2",
  "c1",
  "c2",
  "h1",
  "h2",
  "native"
]

export const HUMAN_LANGUAGE_LEVELS_TO_VALS: Record<string, number> = {
  "h1": 1,
  "h2": 2,
  "a1": 1,
  "a2": 2,
  "b1": 3,
  "b2": 4,
  "c1": 5,
  "c2": 6,
  "native": 7,
}
