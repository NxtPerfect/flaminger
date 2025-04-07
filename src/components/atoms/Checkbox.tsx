import React from 'react'

type Props = {
  className?: string
  checkboxClassName?: string
  children: React.ReactNode
  name: string
  required?: boolean
}

export default function Checkbox({ className, checkboxClassName, children, name, required = false }: Props) {
  const style = `flex flex-row gap-4 max-w-[40ch] text-pretty items-center ${className}`.trim();
  const checkboxStyle = `flex flex-shrink-0 size-4 rounded-md px-2 py-1 text-black ${checkboxClassName}`.trim();

  return (
    <div className={style}>
      <label htmlFor={name}>{required && "*"}{children}</label>
      <input type="checkbox" name="dataConsent" required={required} className={checkboxStyle} />
    </div>
  )
}

