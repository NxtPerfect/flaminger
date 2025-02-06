import React from 'react'

type Props = {
  className?: string
  children: React.ReactNode
}

export default function TableHead({ className, children }: Props) {
  const style = `flex w-full ${className}`.trim()
  return (
    <thead className={style}>
      {children}
    </thead>
  )
}

