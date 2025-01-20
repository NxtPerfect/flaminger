"use client" // Possible that i need to make the form client,
// and leave this page as server
import React, { FormEvent } from 'react'
import ActionButton from './ActionButton'

type Props = {
  readonly formType: "login" | "register"
}

export default function Form({ formType }: Props) {
  async function registerOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch('/api/register', {
      method: "POST",
      body: formData,
    })

    const data = await response.json();
  }

  async function loginOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch('/api/login', {
      method: "POST",
      body: formData,
    })

    const data = await response.json();
  }

  if (formType === "register") {
    return (
      <form className="flex flex-col gap-2 bg-neutral-800 rounded-md px-8 py-4 min-w-[30ch] max-w-[40ch]"
        onSubmit={registerOnSubmit} method="POST">
        <label htmlFor="email">Email address*</label>
        <input type="text" name="email" placeholder="sample@email.io" required className="rounded-md px-2 py-1 text-black" />
        <label htmlFor="firstname">Firstname*</label>
        <input type="text" name="firstname" placeholder="Steve" required className="rounded-md px-2 py-1 text-black" />
        <label htmlFor="surname">Surname*</label>
        <input type="text" name="surname" placeholder="Jobs" required className="rounded-md px-2 py-1 text-black" />
        <label htmlFor="password">Password*</label>
        <input type="password" name="password" placeholder="******" required className="rounded-md px-2 py-1 text-black" />
        <label htmlFor="confirmPassword">Confirm password*</label>
        <input type="password" name="confirmPassword" placeholder="******" required className="rounded-md px-2 py-1 text-black" />
        <div className="flex flex-row gap-4 mt-8 max-w-[40ch] text-pretty items-center">
          <label htmlFor="dataConsent">I consent to handing over my data to Flaminger for purpose of correctly working platform.*</label>
          <input type="checkbox" name="dataConsent" required className="flex-shrink-0 size-4 rounded-md px-2 py-1 text-black" />
        </div>
        <div className="flex flex-row gap-4 mt-4 mb-4 max-w-[40ch] text-pretty items-center">
          <label htmlFor="mailingConsent">I would like to receive job offers and platform updates over email.</label>
          <input type="checkbox" name="mailingConsent" className="flex-shrink-0 size-4 rounded-md px-2 py-1 text-black" />
        </div>
        <span className="text-sm">* Fields are required</span>
        <ActionButton type="formSubmit">Register</ActionButton>
      </form>
    )
  }
  return (
    <form className="flex flex-col gap-2 bg-neutral-800 rounded-md px-8 py-4 min-w-[30ch] max-w-[40ch]"
      onSubmit={loginOnSubmit}>
      <label htmlFor="email">Email address*</label>
      <input type="text" name="email" placeholder="sample@email.io" required className="rounded-md px-2 py-1 text-black" />
      <label htmlFor="password">Password*</label>
      <input type="password" name="password" placeholder="******" required className="rounded-md px-2 py-1 text-black" />
      <ActionButton type="formSubmit">Login</ActionButton>
    </form>
  )
}

