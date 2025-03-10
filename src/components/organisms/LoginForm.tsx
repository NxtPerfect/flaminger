import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import EmailInput from '../molecules/EmailInput';
import PasswordInput from '../atoms/PasswordInput';
import ErrorMessage from '../atoms/ErrorMessage';
import ActionButton from '../atoms/ActionButton';
import { useAuth } from '@/hooks/useAuth';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { error, login } = useAuth();
  const router = useRouter();

  const formStyle = "flex flex-col gap-2 bg-neutral-200 dark:bg-neutral-800 rounded-md px-8 py-4 min-w-[30ch] max-w-[40ch]";

  async function loginOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const formData = new FormData(event.currentTarget)
      await login(formData);
      if (error) {
        setErrorMessage(error);
        return;
      }
      router.push('/');
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  }

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

