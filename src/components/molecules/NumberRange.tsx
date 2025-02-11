import React from 'react'
import NumberInput from '../atoms/NumberInput'

type Props = {
  className?: string
  children: React.ReactNode
  min?: number
  max?: number
  placeholder?: number
  name?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  required: boolean
}

export default function NumberRange({ className = "", children, min, max, placeholder = 2469, name, onChange, required }: Props) {
  const style = `flex flex-col ${className}`.trim();
  const formatter = Intl.NumberFormat('en-US', {
    style: "currency",
    currency: "USD",
    trailingZeroDisplay: "stripIfInteger",
    maximumFractionDigits: 0
  })
  return (
    <div className={style}>
      <label htmlFor={name ?? "number"}>{children}</label>
      <NumberInput onChange={onChange} min={min} max={max} className="w-full" name={name ?? "number"} placeholder={formatter.format(placeholder)} required={required} />
    </div>
  )
}

