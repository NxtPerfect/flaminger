import React from 'react'

type Props = {
  className?: string
  name: string
  placeholder?: string
  required?: boolean
  children?: React.ReactNode
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  defaultValue?: string
}

export default function MultilineTextInput({ className, name, placeholder, required, children, onChange, defaultValue }: Props) {
  const style = `border-2 border-neutral-800 dark:border-neutral-400 resize-none h-[4lh] w-[100%] rounded-md px-2 py-1 text-black invalid:[&:not(:placeholder-shown):not(:focus)]:bg-red-300/80 ${className}`.trim();
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{required && "*"}{children}</label>
      <textarea name={name} placeholder={placeholder} required={required} className={style} onChange={onChange} defaultValue={defaultValue} />
    </div>
  )
}

