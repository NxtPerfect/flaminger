import React, { useContext } from 'react'
import LinkButton from '../organisms/LinkButton'
import { ROLE_VARIANTS, ROLES } from '@/app/lib/definitions'
import { AuthContext } from '@/providers/AuthProvider'

export default function OpenMobileHeader() {
  const auth = useContext(AuthContext);

  return (
    <div className={`flex flex-col top-0 left-0 bg-blue-500
      w-fit px-12 gap-4`}>
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

