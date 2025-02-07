"use client"
import React from 'react'
import RegisterForm from './organisms/RegisterForm'
import LoginForm from './organisms/LoginForm'
import ApplyToJobForm from './organisms/ApplyToJobForm'

type Props = {
  readonly formType: FormType
  readonly jobId?: number
}

type FormType = FORM_VARIANTS[keyof FORM_VARIANTS]

type FORM_VARIANTS = {
  LOGIN: "login",
  REGISTER: "register",
  APPLICATION: "applyToJob"
}

export default function Form({ formType, jobId }: Props) {
  if (formType === "register") {
    return (
      <RegisterForm />
    )
  }

  if (formType === "applyToJob") {
    return (
      <ApplyToJobForm jobId={jobId} />
    )
  }


  return (
    <LoginForm />
  )
}
