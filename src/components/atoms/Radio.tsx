import React from 'react'

type Props = {
  name: string
  children: React.ReactNode
  className?: string
  isActive: boolean
}

export default function Radio({ name, children, className, isActive }: Props) {
  const circle = `bg-white w-4 h-4 rounded-[100%] aspect-square cursor-pointer ${isActive && "border-4 border-orange-600"}`.trim();
  return (
    <div className={className?.trim() ?? "flex flex-row gap-2 min-w-2 min-h-2 items-center"}>
      <label htmlFor={name} className="cursor-pointer">{children}</label>
      <div className={circle}></div>
    </div>
  )
}

