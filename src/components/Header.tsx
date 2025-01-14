import Link from 'next/link'
import React from 'react'
import { LinkButton } from './LinkButton'

export default function Header() {
  return (
    <header className="flex flex-row gap-2 w-full items-center justify-center">
      <LinkButton href="/offers">Job offers</LinkButton>
      <LinkButton href="/about_us">About us</LinkButton>
      <LinkButton href="/login">Signin</LinkButton>
      <LinkButton href="/register">Signup</LinkButton>
    </header>
  )
}

