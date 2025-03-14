import React, { useContext } from 'react'
import LinkButton from '../organisms/LinkButton'
import { ROLE_VARIANTS, ROLES } from '@/app/lib/definitions'
import { AuthContext } from '@/providers/AuthProvider'

export default function OpenMobileHeader() {
  const auth = useContext(AuthContext);

  return (
    <div className={`absolute flex flex-col left-0 mt-4 backdrop-blur-md
bg-neutral-800/50 dark:bg-neutral-500/50 w-fit px-12 gap-4 items-start
py-4 rounded-2xl rounded-tl-none`}>
      {auth?.isLoggedIn &&
        <>
          <LinkButton variant="header" href="/">Home</LinkButton>
          <LinkButton variant="header" href="/offers/1">Job Offers</LinkButton>
          <LinkButton variant="header" href="/profile">My Profile</LinkButton>
          {auth?.role === ROLES[ROLE_VARIANTS.employer] &&
            <LinkButton variant="header" href="/offer/add">Add Offer</LinkButton>}
          {auth?.role === ROLES[ROLE_VARIANTS.employer] &&
            <LinkButton variant="header" href="/applicants">Check Applications</LinkButton>}
          <LinkButton variant="logout" href="/">Logout</LinkButton>
        </>
      }
      {auth?.isLoggedIn === false &&
        <>
          <LinkButton variant="header" href="/">Home</LinkButton>
          <LinkButton variant="header" href="/offers/1">Job Offers</LinkButton>
          <LinkButton variant="header" href="/login">Signin</LinkButton>
          <LinkButton variant="header" href="/register">Signup</LinkButton>
        </>
      }
    </div>
  )
}

