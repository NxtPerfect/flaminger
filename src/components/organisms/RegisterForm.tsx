import { useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react'
import EmailInput from '../molecules/EmailInput';
import FirstnameInput from '../molecules/FirstnameInput';
import SurnameInput from '../molecules/SurnameInput';
import PasswordInput from '../atoms/PasswordInput';
import ConfirmPasswordInput from '../molecules/ConfirmPasswordInput';
import DataConsentCheckbox from '../molecules/DataConsentCheckbox';
import MailingConsentCheckbox from '../molecules/MailingConsentCheckbox';
import ActionButton from '../atoms/ActionButton';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { isLoggedIn, isLoading, error, register } = useAuth();
  const router = useRouter();

  const registerFormStyle = "flex flex-col gap-2 bg-neutral-200 dark:bg-neutral-800 rounded-md px-8 py-4 min-w-[30ch] max-w-[40ch]";

  async function registerOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    await register(formData);
  }

  useEffect(() => {
    if (error && !isLoading) {
      setErrorMessage(error);
      return;
    }
    if (!error && isLoggedIn && !isLoading) {
      router.push('/');
      router.refresh();
      return;
    }
  }, [isLoading, isLoggedIn, error, router])

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
      {errorMessage ? <p className="text-red-500">{errorMessage}</p> : null}
      <ActionButton variant="formSubmit" isLoading={isLoading}>Register</ActionButton>
    </form>
  )
}

