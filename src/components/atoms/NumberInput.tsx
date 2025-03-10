import React from 'react'

type Props = {
  className?: string
  name: string
  placeholder?: string
  required?: boolean
  pattern?: string
  children?: React.ReactNode
  min?: number
  max?: number
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  defaultValue?: number
}

export default function NumberInput({ className, name, placeholder, required, pattern, children, min, max, onChange, defaultValue }: Props) {
  const style = `w-[100%] rounded-md px-2 py-1 text-black
invalid:[&:not(:placeholder-shown):not(:focus)]:bg-red-300/80 ${className}`.trim();
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{required && "*"}{children}</label>
      <input type="number" min={min ?? ""} max={max ?? ""} name={name} placeholder={placeholder} pattern={pattern} required={required} className={style} onChange={onChange} defaultValue={defaultValue} />
    </div>
  )
}

