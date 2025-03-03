import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import EmailInput from '../molecules/EmailInput';
import PasswordInput from '../atoms/PasswordInput';
import ErrorMessage from '../atoms/ErrorMessage';
import ActionButton from '../atoms/ActionButton';

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

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const formStyle = "flex flex-col gap-2 bg-neutral-400 dark:bg-neutral-800 rounded-md px-8 py-4 min-w-[30ch] max-w-[40ch]";

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

  function isBadData(data: ReturnData) {
    return data.errorType === "badData";
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
    <form
      className={formStyle}
      onSubmit={loginOnSubmit}
    >
      <EmailInput />
      <PasswordInput name="password" pattern="^(?=.{8,64}$)[a-z0-9]+$">Password</PasswordInput>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <ActionButton variant="formSubmit" isLoading={isLoading}>Login</ActionButton>
    </form>
  )
}

