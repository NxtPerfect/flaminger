import React from 'react'
import Select from '../atoms/Select'
import Option from '../atoms/Option'

export default function CityPicker() {
  return (
    <div className="flex flex-col">
      <label htmlFor="city">City of employment:</label>
      <Select name="city">
        <Option value="NewJersey">New Jersey</Option>
        <Option value="NewYork">New York</Option>
        <Option value="none">None</Option>
      </Select>
    </div>
  )
}

