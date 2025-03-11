"use client";
import { useRouter } from 'next/navigation';
import React, { FormEvent, useContext, useEffect } from 'react'
import EmailInput from '../molecules/EmailInput';
import FirstnameInput from '../molecules/FirstnameInput';
import SurnameInput from '../molecules/SurnameInput';
import PasswordInput from '../atoms/PasswordInput';
import ConfirmPasswordInput from '../molecules/ConfirmPasswordInput';
import DataConsentCheckbox from '../molecules/DataConsentCheckbox';
import MailingConsentCheckbox from '../molecules/MailingConsentCheckbox';
import ActionButton from '../atoms/ActionButton';
import { AuthContext } from '@/providers/AuthProvider';

export default function RegisterForm() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const registerFormStyle = "flex flex-col gap-2 bg-neutral-200 dark:bg-neutral-800 rounded-md px-8 py-4 min-w-[30ch] max-w-[40ch]";

  async function registerOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    await auth?.register(formData);
  }

  useEffect(() => {
    if (!auth?.error && auth?.isLoggedIn && !auth?.isLoading) {
      router.push('/');
      router.refresh();
      return;
    }
  }, [auth?.isLoading, auth?.isLoggedIn, auth?.error, router])

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
      {auth?.error ? <p className="text-red-500">{auth?.error}</p> : null}
      <ActionButton variant="formSubmit" isLoading={auth?.isLoading}>Register</ActionButton>
    </form>
  )
}

