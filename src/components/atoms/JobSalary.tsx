import React from 'react'

type Props = {
  salary: { min: number, max: number }
}

export default function JobSalary({ salary }: Props) {
  const currency = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return (
    <span className="font-mono">
      {currency.format(salary.min)} - {currency.format(salary.max)} / month
    </span>
  )
}

