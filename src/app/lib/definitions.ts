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
}

export type Offer = {
  id: number
  title: string
  description: string
  byCompanyId: number
  company: string
  isClosed: boolean
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
}

export type SvgProps = {
  className?: string
  imageAlt?: string
}

export type PickerProps = {
  whichRadioIsActive: number
  setWhichRadioIsActiveAction: Dispatch<SetStateAction<number>>
}
