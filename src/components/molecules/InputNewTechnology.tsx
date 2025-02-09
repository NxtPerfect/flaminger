import React from 'react'
import TextInput from '../atoms/TextInput'
import NumberInput from '../atoms/NumberInput'

type Props = {
  name: string
  minimumYearsOfExperience: number
}

export default function InputNewTechnology({ name, minimumYearsOfExperience }: Props) {
  return (
    <div className="flex flex-row gap-3 w-full px-2">
      <div className="w-2/3">
        <TextInput name="text" placeholder="Javascript" pattern="(\w){2:64}" value={name} />
      </div>
      <div className="w-1/4">
        <NumberInput name="number" placeholder="2" pattern="(\d){1:2}" value={minimumYearsOfExperience} />
      </div>
    </div>
  )
}

