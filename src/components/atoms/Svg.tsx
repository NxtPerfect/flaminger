import React from 'react'

type Props = {
  className?: string
  children: React.ReactNode
}

export default function Svg({ className, children }: Props) {
  const style = `size-6 ${className}`.trim();
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={style}>
      {children}
    </svg>
  )
}

