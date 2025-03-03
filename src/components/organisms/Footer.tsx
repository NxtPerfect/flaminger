import React from 'react'
import LinkButton from './LinkButton'

export default function Footer() {
  return (
    <footer className="bg-neutral-800 py-4 px-8 h-[10svh] bottom-0">
      <LinkButton variant="footer" href="/about">About Us</LinkButton>
      Flaminger is in growth phase, many elements can be subjects to change.
    </footer>
  )
}

