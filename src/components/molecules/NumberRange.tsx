import React from 'react'
import NumberInput from '../atoms/NumberInput'

type Props = {
  className?: string
  children: React.ReactNode
  min?: number
  max?: number
  placeholder?: number
}

export default function NumberRange({ className = "", children, min, max, placeholder = 140 }: Props) {
  const style = `flex flex-col ${className}`.trim();
  const formatter = Intl.NumberFormat('en-US', {
    style: "currency",
    currency: "USD",
    trailingZeroDisplay: "stripIfInteger",
    maximumFractionDigits: 0
  })
  return (
    <div className={style}>
      <label htmlFor="max">{children}</label>
      <NumberInput min={min} max={max} className="w-full" name="max" placeholder={formatter.format(placeholder)} />
    </div>
  )
}

