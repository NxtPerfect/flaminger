import React from 'react'
import CitySvg from './CitySvg'

export default function CityInfo({ city }: { city: string }) {
  return (
    <div className="flex flex-row gap-1">
      <CitySvg imageAlt='' />
      <span>
        {city[0].toUpperCase() + city.slice(1)}
      </span>
    </div>
  )
}

