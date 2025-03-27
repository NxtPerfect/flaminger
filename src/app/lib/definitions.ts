import { SelectHumanLanguagesToUsers, SelectJobs, SelectTechnologiesToUsers, SelectUser } from "@/db/schema";
import { Dispatch, SetStateAction } from "react"

export const MAX_JOBS_PER_PAGE = 2;
export const FEATURE_FLAG_READ_MORE = true;

export type ErrorVariant = typeof ERROR_VARIANTS[keyof typeof ERROR_VARIANTS];

export const ERROR_VARIANTS = {
  BAD_DATA: "badData",
  PASSWORDS_NOT_MATCHING: "passwordAndConfirmPasswordNotSame",
  EMPTY_FIELDS: "someFieldsAreEmpty",
  NO_DATA_CONSENT: "dataNotConsent",
  USER_EXISTS: "userExists",
  OTHER: "unknownError"
}

export const ERROR_MESSAGES = {
  [ERROR_VARIANTS.BAD_DATA]:
    "Ensure all fields are valid.",
  [ERROR_VARIANTS.PASSWORDS_NOT_MATCHING]:
    "Confirm password doesn't match password.",
  [ERROR_VARIANTS.EMPTY_FIELDS]:
    "Some fields are empty. Populate all fields.",
  [ERROR_VARIANTS.NO_DATA_CONSENT]:
    "You must consent to data sending.",
  [ERROR_VARIANTS.USER_EXISTS]:
    "This user already exists.",
  [ERROR_VARIANTS.OTHER]:
    "Unknown error. Please report the circumstances of the situation."
}

export const ROLE_VARIANTS = {
  user: "user",
  employer: "employer",
  admin: "admin",
  guest: "none"
}

export type RoleVariant = typeof ROLE_VARIANTS[keyof typeof ROLE_VARIANTS];

export const ROLES = {
  [ROLE_VARIANTS.admin]: "admin",
  [ROLE_VARIANTS.employer]: "employer",
  [ROLE_VARIANTS.user]: "user",
  [ROLE_VARIANTS.guest]: "none"
}

export type SessionPayload = {
  userId: string
  isEmployer: boolean
  expiresAt: Date
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
}

export type JobsTable = {
  id: number
  title: string
  description: string
  byCompanyId: number
  isClosed: boolean | null
  createdAt: Date
  minSalary: number | null
  maxSalary: number | null
  city: string | null
  jobType: "remote" | "hybrid" | "stationary" | string | null
  contractType: "b2b" | "contract" | string | null
  workhourType: "full" | "part" | "internship" | string | null
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

export type CompaniesTable = {
  id: number
  name: string
  jobsAccepted: number | null
  jobsRejected: number | null
  acceptanceRate: number | null
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

export type JobsToUsersTable = {
  userId: number
  jobId: number
  isApplied: boolean
  isApplicationInProgress: boolean
  isAccepted: boolean
  rejectionReason: string | null
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
  experience: string | number
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

export type RegisterFormData = {
  id?: number
  firstname?: string
  surname?: string
  email?: string
  password?: string
  confirmPassword?: string
  dataConsent?: string
  mailingConsent?: string
}

export type Application = {
  job: SelectJobs
  candidate: {
    personalInformation: SelectUser,
    technologies: SelectTechnologiesToUsers[],
    humanLanguages: SelectHumanLanguagesToUsers[],
  }
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

export type Requirements = {
  tech: Technology
  langs: HumanLanguage
}

export type TechRequirement = {
  jobId: number
  tech: {
    name: string
    experience: string
  }[]
}

export type LangRequirement = {
  jobId: number
  langs: {
    name: string
    level: string
  }[]
}

export type Filter = {
  title: string
  companyName: string
  minSalary: number
  maxSalary: number
  jobType: "remote" | "hybrid" | "stationary" | string
  contractType: "b2b" | "contract" | string
  workhourType: "full" | "part" | "internship" | string
  city: string
}

export type techReturnData = {
  jobId: number,
  name: string,
  experience: string
}

export type langReturnData = {
  jobId: number,
  name: string,
  level: string
}
