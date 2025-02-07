import React from 'react'

type Props = {
  className?: string
  value: string
  children: React.ReactNode
}

export default function Option({ className, value, children }: Props) {
  const style = `bg-black text-red-500 ${className}`.trim();
  return (
    <option className={style} value={value}>
      {children}
    </option>
  )
}

