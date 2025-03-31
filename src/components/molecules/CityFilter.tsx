import React, { ChangeEvent } from 'react'
import Select from '../atoms/Select'
import Option from '../atoms/Option'

type Props = {
  cities: string[]
  handleCity: (city: string) => void
}

export default function CityFilter({ cities, handleCity }: Props) {

  return (
    <div>
      <label htmlFor="city">
        City
      </label>
      <Select
        name="city"
        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
          console.log("Event", event.currentTarget.value);
          handleCity(event.currentTarget.value);
        }}
        className="px-2 py-2"
      >
        <Option value="" key={0}>
          Any
        </Option>
        {cities && cities.map((city, index) => {
          return (
            <Option value={city} key={index}>
              {city}
            </Option>
          )
        })}
      </Select>
    </div >
  )
}

