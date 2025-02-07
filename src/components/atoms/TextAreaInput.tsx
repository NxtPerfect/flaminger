import React from 'react'

type Props = {
  className?: string
  children: React.ReactNode
  placeholder: string
  name: string
  required: boolean
}

export default function TextAreaInput({ className, children, placeholder, name, required }: Props) {
  const style = `text-black resize-none rounded-md p-2 ${className}`.trim()
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{required && "*"}{children}</label>
      <textarea name={name} className={style} required={required} placeholder={placeholder}></textarea>
    </div>
  )
}

