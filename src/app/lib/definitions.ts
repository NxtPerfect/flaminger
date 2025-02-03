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

export type Requirement = {
  languages: string
  minimumExperienceInYears: number
}

export type OfferWithCompanyInfo = {
  jobs_table: Offer
  companies_table: Company
  jobs_to_users_table: UserApplications
}

export type Offer = {
  id: number
  byCompanyId: number
  title: string
  description: string
  company: string
  isClosed: boolean
  // requirements: Array<Requirement>
  // state: "new" | "applied" | "accepted" | "rejected"
}

export type Company = {
  id: number
  name: string
  jobsAccepted: number
  jobsRejected: number
  acceptanceRate: number
}

export type UserApplications = {
  userId: number
  jobId: number
  isApplied: boolean
  isApplicationInProgress: boolean
  isAccepted: boolean
  rejectionReason: string
}

