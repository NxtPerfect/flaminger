import React from 'react'
import TextInput from '../atoms/TextInput'
import NumberInput from '../atoms/NumberInput'

type Props = {
  index: number
  handleNumberInput: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  handleTextInput: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
}

export default function InputNewTechnology({ index, handleNumberInput, handleTextInput }: Props) {
  return (
    <div className="flex flex-row gap-3 w-full px-2 h-full">
      <div className="w-2/3">
        <TextInput name="name" placeholder="Javascript"
          onChange={(e) => handleTextInput(e, index)} />
      </div>
      <div className="w-1/4">
        <NumberInput name="experience" min={0} max={99}
          placeholder="2"
          onChange={(e) => handleNumberInput(e, index)} />
      </div>
    </div>
  )
}

