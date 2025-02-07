import React from 'react'
import MinMaxSalaryInput from './MinMaxSalaryRange'

export default function SalaryRange() {
  return (
    <div className="flex flex-col">
      <label htmlFor="salary">*Salary range:</label>
      <MinMaxSalaryInput min={0} max={50000} />
    </div>
  )
}

