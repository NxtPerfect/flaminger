import Link from 'next/link'
import React from 'react'
import { LinkButton } from './LinkButton'

export default function Header() {
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

