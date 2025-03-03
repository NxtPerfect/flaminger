"use client"
import React from 'react'
import RegisterForm from './RegisterForm'
import ApplyToJobForm from './ApplyToJobForm'
import LoginForm from './LoginForm'
import SettingsForm from './SettingsForm'

type Props = {
  readonly formType: FormType
  readonly jobId?: number
}

type FormType = FORM_VARIANTS[keyof FORM_VARIANTS]

type FORM_VARIANTS = {
  LOGIN: "login",
  REGISTER: "register",
  APPLICATION: "applyToJob",
  SETTINGS: "settings"
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

  if (formType === "login") {
    return (
      <LoginForm />
    )
  }


  return (
    <SettingsForm />
  )
}
