"use client";
import React, { useState } from 'react'
import NumberRange from './NumberRange'

type Props = {
  className?: string
  min: number
  max: number
}

export default function MinMaxSalaryInput({ className, min, max }: Props) {
  const style = `flex flex-col border-2 border-neutral-700 rounded-md p-4 ${className}`.trim();
  const [minVal, setMin] = useState<number>(min);
  const [maxVal, setMax] = useState<number>(max);

  function handleMin(e: React.ChangeEvent<HTMLInputElement>) {
    let parsedNumber = e.currentTarget.valueAsNumber ?? 0;
    console.log("Min", parsedNumber);
    if (parsedNumber > maxVal || parsedNumber > max) {
      parsedNumber = maxVal;
      e.currentTarget.valueAsNumber = maxVal;
    }
    if (parsedNumber < min) {
      parsedNumber = min;
      e.currentTarget.valueAsNumber = min;
    }
    setMin(parsedNumber);
    console.log("Min val", minVal);
  }

  function handleMax(e: React.ChangeEvent<HTMLInputElement>) {
    let parsedNumber = e.currentTarget.valueAsNumber ?? 0;
    console.log("Max", parsedNumber);
    if (parsedNumber < minVal || parsedNumber < min) {
      parsedNumber = minVal;
      e.currentTarget.valueAsNumber = minVal;
    }
    if (parsedNumber > max) {
      parsedNumber = max;
      e.currentTarget.valueAsNumber = max;
    }
    setMax(parsedNumber);
    console.log("Max val", maxVal);
  }

  return (
    <div className={style}>
      <div className="flex flex-row w-full gap-2 justify-between">
        <NumberRange onChange={handleMin} name="minSalary" className="w-1/3" min={min} max={Math.max(max, maxVal)} placeholder={1000}>
          *Min. Salary
        </NumberRange>
        <NumberRange onChange={handleMax} name="maxSalary" className="w-1/3" min={Math.max(min, minVal)} max={max} placeholder={50000}>
          *Max. Salary
        </NumberRange>
      </div>
    </div>
  )
}

