import React from 'react'

type Props = {
  children: React.ReactNode
  className?: string
}

export default function SkillRectangle({ children, className }: Props) {
  const style = `rounded-md bg-neutral-600 px-2 py-1 ${className}`.trim();
  return (
    <div className={style}>
      {children ?? "TechName: 5 years"}
    </div>
  )
}

