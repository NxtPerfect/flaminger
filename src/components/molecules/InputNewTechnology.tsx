import React from 'react'
import TextInput from '../atoms/TextInput'
import NumberInput from '../atoms/NumberInput'

type Props = {
  name: string
  minimumYearsOfExperience: number
}

export default function InputNewTechnology({ name, minimumYearsOfExperience }: Props) {
  function handleNumberInput(e: React.ChangeEvent<HTMLInputElement>) {
    let parsedNumber = e.currentTarget.valueAsNumber ?? 0;
    if (parsedNumber < 0 || parsedNumber > 99) {
      parsedNumber = 0;
    }
    minimumYearsOfExperience = parsedNumber;
  }

  function handleTextInput(e: React.ChangeEvent<HTMLInputElement>) {
    const parsedName = e.currentTarget.value.trim().slice(0, 64) ?? "Empty";
    name = parsedName;
  }

  return (
    <div className="flex flex-row gap-3 w-full px-2">
      <div className="w-2/3">
        <TextInput name="name" placeholder="Javascript" pattern="^\D{2,64}$" onChange={handleTextInput} defaultValue={name} />
      </div>
      <div className="w-1/4">
        <NumberInput name="minimumYearsOfExperience" min={0} max={99} placeholder="2" pattern="^\d{1,2}$" onChange={handleNumberInput} defaultValue={minimumYearsOfExperience} />
      </div>
    </div>
  )
}

