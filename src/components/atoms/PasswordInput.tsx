import React from 'react'

type Props = {
  className?: string
  name?: string
  pattern?: string
  children?: string
  id?: string
}

export default function PasswordInput({ className, name = "password", pattern, children = "Password", id }: Props) {
  const style = `rounded-md px-2 py-1 text-black border-inside invalid:[&:not(:placeholder-shown):not(:focus)]:bg-red-300/80 ${className}`.trim();
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>*{children}</label>
      <input type="password" name={name} id={id ?? name}
        placeholder="******" pattern={pattern} required minLength={8}
        maxLength={64} className={style} />
      <p className="text-sm">
        Minimum of 8 characters, only numbers and letters.
      </p>
    </div>
  )
}

