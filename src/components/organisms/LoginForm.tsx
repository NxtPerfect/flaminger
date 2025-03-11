import { useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react'
import EmailInput from '../molecules/EmailInput';
import PasswordInput from '../atoms/PasswordInput';
import ErrorMessage from '../atoms/ErrorMessage';
import ActionButton from '../atoms/ActionButton';
import { useAuth } from '@/hooks/useAuth';

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { isLoggedIn, isLoading, error, login } = useAuth();
  const router = useRouter();

  const formStyle = "flex flex-col gap-2 bg-neutral-200 dark:bg-neutral-800 rounded-md px-8 py-4 min-w-[30ch] max-w-[40ch]";

  async function loginOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const formData = new FormData(event.currentTarget)
    await login(formData);
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
    <form
      className={formStyle}
      onSubmit={loginOnSubmit}
    >
      <EmailInput />
      <PasswordInput name="password" pattern="^(?=.{8,64}$)[a-z0-9]+$">Password</PasswordInput>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <ActionButton variant="formSubmit" isLoading={isLoading}>Login</ActionButton>
    </form>
  )
}

