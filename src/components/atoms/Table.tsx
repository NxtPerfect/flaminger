import React from 'react'

type Props = {
  className?: string
  children: React.ReactNode
}

export default function Table({ className, children }: Props) {
  const style = `border-2 border-neutral-300 dark:border-neutral-800 ${className}`.trim();
  return (
    <table className={style}>
      {children}
    </table>
  )
}

