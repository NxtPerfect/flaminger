import React from 'react'

type Props = {
  className?: string
  name: string
  children?: React.ReactNode
  required?: boolean
}

export default function Select({ className = "", name, children, required = false }: Props) {
  const style = `flex rounded-md p-1 text-black w-full ${className}`.trim();
  return (
    <select className={style} name={name} required={required}>
      {children}
    </select>
  )
}

