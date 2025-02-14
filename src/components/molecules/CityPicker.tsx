import React from 'react'
import Select from '../atoms/Select'
import Option from '../atoms/Option'

type Props = {
  children?: React.ReactNode
}

export default function CityPicker({children} : Props) {
  return (
    <div className="flex flex-col">
      <label htmlFor="city">{children ?? "City of employment:"}</label>
      <Select name="city">
        <Option value="NewJersey">New Jersey</Option>
        <Option value="NewYork">New York</Option>
        <Option value="none">None</Option>
      </Select>
    </div>
  )
}

