"use client";
import { useRouter } from 'next/navigation';
import React, { FormEvent, useContext, useEffect } from 'react'
import EmailInput from '../molecules/EmailInput';
import PasswordInput from '../atoms/PasswordInput';
import ErrorMessage from '../atoms/ErrorMessage';
import ActionButton from '../atoms/ActionButton';
import { AuthContext } from '@/providers/AuthProvider';

export default function LoginForm() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const formStyle = "flex flex-col gap-2 bg-neutral-200 dark:bg-neutral-800 rounded-md px-8 py-4 min-w-[30ch] max-w-[40ch]";

  async function loginOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget)
    await auth?.login(formData);
  }

  useEffect(() => {
    if (!auth?.error && auth?.isLoggedIn && !auth?.isLoading) {
      router.push('/');
      router.refresh();
      return;
    }
  }, [auth?.isLoading, auth?.isLoggedIn, auth?.error, router])

  return (
    <form
      className={formStyle}
      onSubmit={loginOnSubmit}
    >
      <EmailInput />
      <PasswordInput name="password" pattern="^(?=.{8,64}$)[a-z0-9]+$">Password</PasswordInput>
      {auth?.error && <ErrorMessage>{auth?.error}</ErrorMessage>}
      <ActionButton variant="formSubmit" isLoading={auth?.isLoading}>Login</ActionButton>
    </form>
  )
}

