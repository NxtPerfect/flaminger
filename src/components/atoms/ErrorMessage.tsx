import React from 'react'

type Props = {
  className?: string
  children: React.ReactNode
}

export default function ErrorMessage({ className, children }: Props) {
  const style = `text-red-500 ${className}`.trim();
  return (
    <span className={style}>
      {children}
    </span>
  )
}

