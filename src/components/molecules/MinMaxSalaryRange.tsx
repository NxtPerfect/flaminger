import React from 'react'
import NumberRange from './NumberRange'

type Props = {
  className?: string
  min: number
  max: number
}

export default function MinMaxSalaryInput({ className, min, max }: Props) {
  const style = `flex flex-col border-2 border-neutral-700 rounded-md p-4 ${className}`.trim();
  return (
    <div className={style}>
      <div className="flex flex-row w-full gap-2 justify-between">
        <NumberRange className="w-1/3" min={min} max={max} placeholder={1000}>
          *Min. Salary
        </NumberRange>
        <NumberRange className="w-1/3" min={min} max={max} placeholder={50000}>
          *Max. Salary
        </NumberRange>
      </div>
    </div>
  )
}

