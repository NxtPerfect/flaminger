import React from 'react'

type Props = {
  className?: string
  children: React.ReactNode
}

export default function TableBody({ className, children }: Props) {
  return (
    <tbody className={className}>
      {children}
    </tbody>
  )
}

