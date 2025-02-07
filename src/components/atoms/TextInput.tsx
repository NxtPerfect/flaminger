import React from 'react'

type Props = {
  className?: string
  name: string
  placeholder?: string
  required?: boolean
  pattern?: string
  children?: React.ReactNode
}

export default function TextInput({ className, name, placeholder, required, pattern, children }: Props) {
  const style = `rounded-md px-2 py-1 text-black invalid:[&:not(:placeholder-shown):not(:focus)]:bg-red-300/80 ${className}`.trim();
  return (
    <>
      <label htmlFor={name}>{children}{required && "*"}</label>
      <input type={name === "email" ? "email" : "text"} name={name} placeholder={placeholder} pattern={pattern} required={required} className={style} />
    </>
  )
}

