import React from 'react'
import LinkButton from './LinkButton'

export default function Footer() {
  return (
    <footer className="grid grid-cols-2 justify-center items-center text-white bg-neutral-800 py-4 px-8 min-h-[10svh] bottom-0">
      <LinkButton variant="footer" href="/about">About Us</LinkButton>
      <p>Flaminger is in growth phase, many elements can be subjects to change.</p>
    </footer>
  )
}

