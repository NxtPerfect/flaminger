import React from 'react'

type Props = {
  className?: string
  children: React.ReactNode
}

export default function TableColumn({ className, children }: Props) {
  const style = `flex justify-center border-2 border-neutral-800 p-1 ${className}`.trim()
  return (
    <td className={style}>
      {children}
    </td>
  )
}

