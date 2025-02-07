import React from 'react'

type Props = {
  className?: string
}

export default function ConfirmPasswordInput({ className }: Props) {
  const style = `rounded-md px-2 py-1 text-black border-inside invalid:[&:not(:placeholder-shown):not(:focus)]:bg-red-300/80 ${className}`.trim();
  return (
    <>
      <label htmlFor="confirmPassword">Confirm password*</label>
      <input type="password" name="confirmPassword" placeholder="******" pattern="^(?=.{8,64}$)[a-z0-9]+$" required minLength={8} maxLength={64} className={style} />
    </>
  )
}

