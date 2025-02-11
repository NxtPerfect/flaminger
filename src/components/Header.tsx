"use server"
import React from 'react'
import LinkButton from './LinkButton'
import { cookies } from 'next/headers';
import { getIsUserEmployer } from '@/app/lib/session';

export default async function Header() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")
  const isEmployer = await getIsUserEmployer();
  const headerStyle = "sticky top-0 flex flex-row gap-2 min-h-[6svh] w-full text-xl items-center justify-center backdrop-blur-md bg-neutral-800/50";

  if (session?.value) {
    return (
      <header className={headerStyle}>
        <LinkButton variant="header" href="/">Home</LinkButton>
        <LinkButton variant="header" href="/offers">Job Offers</LinkButton>
        <LinkButton variant="header" href="/about_us">About Us</LinkButton>
        <LinkButton variant="header" href="/profile">My Profile</LinkButton>
        {isEmployer && <LinkButton variant="header" href="/offer/add">Add Offer</LinkButton>}
        {isEmployer && <LinkButton variant="header" href="/applicants">Check Applications</LinkButton>}
        <LinkButton variant="logout" href="/">Logout</LinkButton>
      </header>
    )
  }
  return (
    <header className={headerStyle}>
      <LinkButton variant="header" href="/">Home</LinkButton>
      <LinkButton variant="header" href="/offers">Job Offers</LinkButton>
      <LinkButton variant="header" href="/about_us">About Us</LinkButton>
      <LinkButton variant="header" href="/login">Signin</LinkButton>
      <LinkButton variant="header" href="/register">Signup</LinkButton>
    </header>
  )
}

