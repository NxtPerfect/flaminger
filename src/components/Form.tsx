"use client"
import React, { FormEvent, useState } from 'react'
import ActionButton from './ActionButton'
import { useRouter } from 'next/navigation'
import { createSession } from '@/app/lib/session'

type Props = {
  readonly formType: FormType
  readonly jobId: number
}

type FormType = FORM_VARIANTS[keyof FORM_VARIANTS]

type ReturnData = {
  readonly errorType?: ErrorVariant
  readonly status: number
}

type ErrorVariant = typeof ERROR_VARIANTS[keyof typeof ERROR_VARIANTS]

type FORM_VARIANTS = {
  LOGIN: "login",
  REGISTER: "register",
  APPLICATION: "applyToJob"
}

const ERROR_VARIANTS = {
  BAD_DATA: "badData",
  PASSWORDS_NOT_MATCHING: "passwordAndConfirmPasswordNotSame",
  EMPTY_FIELDS: "someFieldsAreEmpty",
  NO_DATA_CONSENT: "dataNotConsent",
  USER_EXISTS: "userExists",
  OTHER: "unknownError"
}

const ERROR_MESSAGES = {
  [ERROR_VARIANTS.BAD_DATA]: "Ensure all fields are valid.",
  [ERROR_VARIANTS.PASSWORDS_NOT_MATCHING]: "Confirm password doesn't match password.",
  [ERROR_VARIANTS.EMPTY_FIELDS]: "Some fields are empty. Populate all fields.",
  [ERROR_VARIANTS.NO_DATA_CONSENT]: "You must consent to data sending.",
  [ERROR_VARIANTS.USER_EXISTS]: "This user already exists.",
  [ERROR_VARIANTS.OTHER]: "Unknown error. Please report the circumstances of the situation."
}

export default function Form({ formType, jobId }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const inputStyle = "rounded-md px-2 py-1 text-black";
  const checkboxStyle = "flex flex-shrink-0 size-4 rounded-md px-2 py-1 text-black";
  const loginFormStyle = "flex flex-col gap-2 bg-neutral-800 rounded-md px-8 py-4 min-w-[30ch] max-w-[40ch]";
  const registerFormStyle = "flex flex-col gap-2 bg-neutral-800 rounded-md px-8 py-4 min-w-[30ch] max-w-[40ch]";

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
      const error = getErrorIfBadRequest(data);
      if (error) {
        setError(error);
        return;
      }

      await createSession(data.userId);
      router.push('/profile');
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  }

  function getErrorIfBadRequest(data: ReturnData) {
    if (isPasswordsMatching(data)) {
      return ERROR_MESSAGES[ERROR_VARIANTS.PASSWORDS_NOT_MATCHING];
    }
    if (isEmptyFields(data)) {
      return ERROR_MESSAGES[ERROR_VARIANTS.EMPTY_FIELDS];
    }
    if (isBadData(data)) {
      return ERROR_MESSAGES[ERROR_VARIANTS.BAD_DATA];
    }
    if (isDataNotConsent(data)) {
      return ERROR_MESSAGES[ERROR_VARIANTS.NO_DATA_CONSENT];
    }
    if (isUserExists(data)) {
      return ERROR_MESSAGES[ERROR_VARIANTS.USER_EXISTS];
    }
    return;
  }

  function isPasswordsMatching(data: ReturnData) {
    return data.errorType === "passwords";
  }

  function isEmptyFields(data: ReturnData) {
    return data.errorType === "emptyFields";
  }

  function isBadData(data: ReturnData) {
    return data.errorType === "badData";
  }

  function isDataNotConsent(data: ReturnData) {
    return data.errorType === "dataConsent";
  }

  function isUserExists(data: ReturnData) {
    return data.errorType === "userExists";
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
      if (isBadData(data)) {
        setError(ERROR_MESSAGES[ERROR_VARIANTS.BAD_DATA]);
        return;
      }
      router.push('/profile');
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  }

  if (formType === "register") {
    return (
      <form className={registerFormStyle}
        onSubmit={registerOnSubmit} method="POST">
        <label htmlFor="email">Email address*</label>
        <input type="text" name="email" placeholder="sample@email.io" required className={inputStyle} />
        <label htmlFor="firstname">Firstname*</label>
        <input type="text" name="firstname" placeholder="Steve" required className={inputStyle} />
        <label htmlFor="surname">Surname*</label>
        <input type="text" name="surname" placeholder="Jobs" required className={inputStyle} />
        <label htmlFor="password">Password*</label>
        <input type="password" name="password" placeholder="******" required minLength={8} maxLength={64} className={inputStyle} />
        <span className="text-sm">Minimum of 8 characters, only numbers and letters.</span>
        <label htmlFor="confirmPassword">Confirm password*</label>
        <input type="password" name="confirmPassword" placeholder="******" required minLength={8} maxLength={64} className={inputStyle} />
        <div className="flex flex-row gap-4 mt-8 max-w-[40ch] text-pretty items-center">
          <label htmlFor="dataConsent">I consent to handing over my data to Flaminger for purpose of correctly working platform.*</label>
          <input type="checkbox" name="dataConsent" required className={checkboxStyle} />
        </div>
        <div className="flex flex-row gap-4 mt-4 mb-4 max-w-[40ch] text-pretty items-center">
          <label htmlFor="mailingConsent">I would like to receive job offers and platform updates over email.</label>
          <input type="checkbox" name="mailingConsent" className={checkboxStyle} />
        </div>
        <span className="text-sm">* Fields are required</span>
        {error ? <span className="text-red-500">{error}</span> : null}
        <ActionButton variant="formSubmit" isLoading={isLoading}>Register</ActionButton>
      </form>
    )
  }

  if (formType === "applyToJob") {
    async function handleApply(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      await fetch(`/api/offer/${jobId}/apply`, {
        method: "PUT",
        body: formData
      })
        .then(() => {
          router.push('/');
          router.refresh();
        }
        )
    }

    return (
      <form className={registerFormStyle} onSubmit={handleApply}>
        <input type="hidden" value={jobId} name="jobId" />
        <label>
          Do you use AI Tools?
        </label>
        <span>
          <input type="checkbox" />
          Yes
        </span>
        <label>
          Are you willing to relocate?
        </label>
        <span className="flex flex-row gap-2">
          <input type="radio" value="yes" /><label>Yes</label>
        </span>
        <span className="flex flex-row gap-2">
          <input type="radio" value="no" /><label>No</label>
        </span>
        <label>
          Type of employment you want:
        </label>
        <select>
          <option>Remote</option>
          <option>Hybrid</option>
          <option>Stationary</option>
        </select>
        <label>
          Describe briefly why you should be accepted for this position.
        </label>
        <input type="text" minLength={1} />
        <label>
          For human verification, what is the name for an animal whose name is duck:
        </label>
        <input type="text" maxLength={16} />
        <ActionButton variant="formSubmit">Apply</ActionButton>
      </form>
    )
  }


  return (
    <form className={loginFormStyle}
      onSubmit={loginOnSubmit}>
      <label htmlFor="email">Email address*</label>
      <input type="text" name="email" placeholder="sample@email.io" required className={inputStyle} />
      <label htmlFor="password">Password*</label>
      <input type="password" name="password" placeholder="******" required className={inputStyle} />
      {error ? <span className="text-red-500">{error}</span> : null}
      <ActionButton variant="formSubmit">Login</ActionButton>
    </form>
  )
}
