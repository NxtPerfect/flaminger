import React from 'react'

type Props = {
  className?: string
  children: React.ReactNode
}

export default function TableRow({ className, children }: Props) {
  const style = `flex ${className}`.trim();
  return (
    <tr className={style}>
      {children}
    </tr>
  )
}

