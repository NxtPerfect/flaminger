"use client";
import React, { useContext } from 'react'
import LinkButton from './LinkButton';
import { ROLE_VARIANTS, ROLES } from '@/app/lib/definitions';
import { AuthContext } from '@/providers/AuthProvider';
import MobileHeader from './MobileHeader';

export default function Header() {
  const headerStyle = `sticky top-0 flex flex-row gap-2 min-h-[6svh]
w-full text-xl items-center justify-center backdrop-blur-md
bg-neutral-800/50 dark:bg-neutral-600/50 z-50`;
  const auth = useContext(AuthContext);

  if (auth?.isLoggedIn && !auth?.isLoading) {
    return (
      <>
        <div className="hidden md:flex md:sticky md:top-0">
          <header className={headerStyle}>
            <LinkButton variant="header" href="/">Home</LinkButton>
            {auth?.role === ROLES[ROLE_VARIANTS.user] &&
              <LinkButton variant="header" href="/offers/1">Job Offers</LinkButton>
            }
            <LinkButton variant="header" href="/profile">My Profile</LinkButton>
            {auth?.role === ROLES[ROLE_VARIANTS.employer] &&
              <LinkButton variant="header" href="/offer/add">Add Offer</LinkButton>
            }
            {auth?.role === ROLES[ROLE_VARIANTS.employer] &&
              <LinkButton variant="header" href="/applicants">Check Applications</LinkButton>
            }
            <LinkButton variant="logout" href="/">Logout</LinkButton>
          </header>
        </div>
        <div className="flex md:hidden">
          <MobileHeader />
        </div>
      </>
    )
  }
  return (
    <>
      <div className="hidden md:flex md:sticky md:top-0">
        <header className={headerStyle}>
          <LinkButton variant="header" href="/">Home</LinkButton>
          <LinkButton variant="header" href="/offers/1">Job Offers</LinkButton>
          <LinkButton variant="header" href="/login">Signin</LinkButton>
          <LinkButton variant="header" href="/register">Signup</LinkButton>
        </header>
      </div>
      <div className="flex md:hidden">
        <MobileHeader />
      </div>
    </>
  )
}

