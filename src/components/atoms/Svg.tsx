import React from 'react'

type Props = {
  className?: string
  children: React.ReactNode
  imageAlt?: string
  viewBox?: string
}

export default function Svg({ className, children, imageAlt, viewBox }: Props) {
  const style = `size-6 ${className}`.trim();
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox={viewBox ?? "0 0 24 24"} strokeWidth={1.5} stroke="currentColor" className={style} aria-label={imageAlt}>
      {children}
    </svg>
  )
}

