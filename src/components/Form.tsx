"use client" // Possible that i need to make the form client,
// and leave this page as server
import React, { FormEvent, useState } from 'react'
import ActionButton from './ActionButton'
import { useRouter } from 'next/navigation'
import { createSession } from '@/app/lib/session'

type Props = {
  readonly formType: "login" | "register"
}

export default function Form({ formType }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  async function registerOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch('/api/register', {
        method: "POST",
        body: formData,
      })

      const data = await response.json();
      if (data.errorType === "passwords") {
        setError("Confirm Password doesn't match password.");
        return;
      }
      if (data.errorType === "emptyFields") {
        setError("Populate all fields.");
        return;
      }
      if (data.errorType === "badData") {
        setError("Ensure all fields are valid.");
        return;
      }
      if (data.errorType === "dataConsent") {
        setError("You must consent to data sending.");
        return;
      }

      if (data.errorType === "userExists") {
        setError("This user already exists, try different email.");
        return;
      }

      await createSession(data.userId);
      router.push('/profile');
    } finally {
      setIsLoading(false);
    }
  }

  async function loginOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch('/api/login', {
        method: "POST",
        body: formData,
      })

      const data = await response.json();
      if (data.status === 200) {
        router.push('/profile');
      }
    } finally {
      setIsLoading(false);
    }
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
        <input type="password" name="password" placeholder="******" required minLength={8} maxLength={64} className="rounded-md px-2 py-1 text-black" />
        <span className="text-sm">Minimum of 8 characters, only numbers and letters.</span>
        <label htmlFor="confirmPassword">Confirm password*</label>
        <input type="password" name="confirmPassword" placeholder="******" required minLength={8} maxLength={64} className="rounded-md px-2 py-1 text-black" />
        <div className="flex flex-row gap-4 mt-8 max-w-[40ch] text-pretty items-center">
          <label htmlFor="dataConsent">I consent to handing over my data to Flaminger for purpose of correctly working platform.*</label>
          <input type="checkbox" name="dataConsent" required className="flex-shrink-0 size-4 rounded-md px-2 py-1 text-black" />
        </div>
        <div className="flex flex-row gap-4 mt-4 mb-4 max-w-[40ch] text-pretty items-center">
          <label htmlFor="mailingConsent">I would like to receive job offers and platform updates over email.</label>
          <input type="checkbox" name="mailingConsent" className="flex-shrink-0 size-4 rounded-md px-2 py-1 text-black" />
        </div>
        <span className="text-sm">* Fields are required</span>
        {error ? <span className="text-red-500">{error}</span> : null}
        <ActionButton type="formSubmit" isLoading={isLoading}>Register</ActionButton>
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
      {error ? <span className="text-red-500">{error}</span> : null}
      <ActionButton type="formSubmit">Login</ActionButton>
    </form>
  )
}

