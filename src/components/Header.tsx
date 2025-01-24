import React from 'react'
import { LinkButton } from './LinkButton'
import { cookies } from 'next/headers';

export default async function Header() {
  const cookieStore = await cookies();
  if (cookieStore.get("session")?.value) {
    return (
      <header className="sticky top-0 flex flex-row gap-2 w-full items-center justify-center backdrop-blur-md">
        <LinkButton type="header" href="/">Home</LinkButton>
        <LinkButton type="header" href="/offers">Job offers</LinkButton>
        <LinkButton type="header" href="/about_us">About us</LinkButton>
        <LinkButton type="header" href="/profile">My Profile</LinkButton>
        <LinkButton type="logout" href="/logout">Logout</LinkButton>
      </header>
    )
  }
  return (
    <header className="sticky top-0 flex flex-row gap-2 w-full items-center justify-center backdrop-blur-md">
      <LinkButton type="header" href="/">Home</LinkButton>
      <LinkButton type="header" href="/offers">Job offers</LinkButton>
      <LinkButton type="header" href="/about_us">About us</LinkButton>
      <LinkButton type="header" href="/login">Signin</LinkButton>
      <LinkButton type="header" href="/register">Signup</LinkButton>
    </header>
  )
}

