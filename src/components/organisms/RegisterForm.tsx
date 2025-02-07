import { createSession } from '@/app/lib/session';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import EmailInput from '../molecules/EmailInput';
import FirstnameInput from '../molecules/FirstnameInput';
import SurnameInput from '../molecules/SurnameInput';
import PasswordInput from '../atoms/PasswordInput';
import ConfirmPasswordInput from '../molecules/ConfirmPasswordInput';
import DataConsentCheckbox from '../molecules/DataConsentCheckbox';
import MailingConsentCheckbox from '../molecules/MailingConsentCheckbox';
import ActionButton from '../ActionButton';

type ReturnData = {
  readonly errorType?: ErrorVariant
  readonly status: number
}

type ErrorVariant = typeof ERROR_VARIANTS[keyof typeof ERROR_VARIANTS]

const ERROR_VARIANTS = {
  BAD_DATA: "badData",
  PASSWORDS_NOT_MATCHING: "passwordAndConfirmPasswordNotSame",
  EMPTY_FIELDS: "someFieldsAreEmpty",
  NO_DATA_CONSENT: "dataNotConsent",
  USER_EXISTS: "userExists",
  OTHER: "unknownError"
}

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

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

  const ERROR_MESSAGES = {
    [ERROR_VARIANTS.BAD_DATA]: "Ensure all fields are valid.",
    [ERROR_VARIANTS.PASSWORDS_NOT_MATCHING]: "Confirm password doesn't match password.",
    [ERROR_VARIANTS.EMPTY_FIELDS]: "Some fields are empty. Populate all fields.",
    [ERROR_VARIANTS.NO_DATA_CONSENT]: "You must consent to data sending.",
    [ERROR_VARIANTS.USER_EXISTS]: "This user already exists.",
    [ERROR_VARIANTS.OTHER]: "Unknown error. Please report the circumstances of the situation."
  }

  return (
    <form className={registerFormStyle}
      onSubmit={registerOnSubmit}
      method="POST">
      <EmailInput />
      <FirstnameInput />
      <SurnameInput />
      <PasswordInput />
      <ConfirmPasswordInput />
      <DataConsentCheckbox />
      <MailingConsentCheckbox />
      <p className="text-sm">* Fields are required</p>
      {error ? <p className="text-red-500">{error}</p> : null}
      <ActionButton variant="formSubmit" isLoading={isLoading}>Register</ActionButton>
    </form>
  )
}

