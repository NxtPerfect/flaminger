"use client";
import { useParams } from 'next/navigation'
import React from 'react'

export default function Reasoning() {
  const params = useParams<{ id: string }>();
  return (
    <>
      <div>Here's the reason:</div>
      <p className="bg-black border-2 border-neutral-800 rounded-md px-4 py-2 font-serif">
        We went with a better candidate, learn some js
      </p>
    </>
  )
}

