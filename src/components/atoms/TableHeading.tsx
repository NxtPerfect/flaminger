import React from 'react'

type Props = {
  className?: string
  children: React.ReactNode
}

export default function TableHeading({ className, children }: Props) {
  const style = `border-2 border-neutral-800 p-1 font-normal ${className}`.trim()
  return (
    <th className={style}>
      {children}
    </th>
  )
}

