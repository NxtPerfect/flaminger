import React from 'react'
import TextInput from '../atoms/TextInput'
import HumanLanguagesDatalist from './HumanLanguagesDatalist'

type Props = {
  index: number
  handleTextInput: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  handleNumberInput: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  includeExperience: boolean
}

export default function InputNewHumanLanguage({
  index,
  handleTextInput,
  handleNumberInput,
  includeExperience
}: Props) {
  return (
    <div className="flex flex-row gap-3 w-full px-2">
      <div className={`${includeExperience ? "w-2/3" : "w-full"}`}>
        <TextInput
          name="language"
          placeholder="German"
          onChange={(e) => handleTextInput(e, index)} />
      </div>
      {includeExperience &&
        <>
          <div className="w-1/4">
            <TextInput
              name="level"
              placeholder="A1"
              onChange={(e) => handleNumberInput(e, index)}
              list="languages" />
          </div>
          <HumanLanguagesDatalist />
        </>
      }
    </div>
  )
}

