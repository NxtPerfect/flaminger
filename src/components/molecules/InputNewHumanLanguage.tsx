import React from 'react'
import TextInput from '../atoms/TextInput'
import { HUMAN_LANGUAGE_LEVELS } from '@/app/lib/definitions'
import HumanLanguagesDatalist from './HumanLanguagesDatalist'

type Props = {
  name: string
  level: string
}

export default function InputNewHumanLanguage({ name, level }: Props) {
  function handleLevelInput(e: React.ChangeEvent<HTMLInputElement>) {
    let parsedLevel = e.currentTarget.value ?? "None";
    if (parsedLevel.toLowerCase()! in HUMAN_LANGUAGE_LEVELS) {
      parsedLevel = "a1";
    }
    level = parsedLevel.toLowerCase();
  }

  function handleTextInput(e: React.ChangeEvent<HTMLInputElement>) {
    const parsedName = e.currentTarget.value.trim().slice(0, 64) ?? "Empty";
    name = parsedName;
  }

  return (
    <div className="flex flex-row gap-3 w-full px-2">
      <div className="w-2/3">
        <TextInput name="language" placeholder="German" pattern="^\D{2,64}$" onChange={handleTextInput} defaultValue={name} />
      </div>
      <div className="w-1/4">
        <TextInput name="level" placeholder="A1" pattern="^\w{1,6}\d{0,1}$" onChange={handleLevelInput} defaultValue={level} list="languages" />
      </div>
      <HumanLanguagesDatalist />
    </div>
  )
}

