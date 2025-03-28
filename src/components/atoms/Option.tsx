import React from 'react'

type Props = {
  className?: string
  value: string
  children: React.ReactNode
  onSelect?: () => void
}

export default function Option({ className, value, children, onSelect }: Props) {
  const style = `bg-black text-red-500 ${className}`.trim();
  return (
    <option className={style} value={value} onSelect={onSelect}>
      {children}
    </option>
  )
}

