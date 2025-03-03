"use client";
import React, { Dispatch, MouseEvent, SetStateAction } from 'react'
import AddItemButton from './AddItemButton'
import TrashBinSvg from './TrashBinSvg';
import { HumanLanguage } from '@/app/lib/definitions';
import InputNewHumanLanguage from './InputNewHumanLanguage';
import ActionButton from '../atoms/ActionButton';

type Props = {
  humanLanguages: HumanLanguage[]
  setHumanLanguagesAction: Dispatch<SetStateAction<HumanLanguage[]>>
  children?: React.ReactNode
}

export default function HumanLanguagesPicker({ humanLanguages, setHumanLanguagesAction, children }: Props) {

  function addHumanLanguageInput() {
    if (humanLanguages.length > 20) return;
    setHumanLanguagesAction(() => [...humanLanguages, { name: "German", level: "A1" }]);
  }

  function removeHumanLanguage(e: MouseEvent<HTMLButtonElement>, index: number) {
    e.preventDefault();
    if (humanLanguages.length == 0) return;
    setHumanLanguagesAction(() => humanLanguages.filter((_, techIndex) => techIndex !== index));
  }

  return (
    <div className="flex flex-col">
      <label htmlFor="humanLanguages">{children ?? "Required Languages:"}</label>
      <div className="border-2 border-neutral-200 dark:border-neutral-700 px-4 py-2 rounded-md">
        {humanLanguages && "Language name | Level (A1, Native)"}
        {humanLanguages.map((humanLanguage, index) => {
          return (
            <div key={index} className="flex flex-row items-center">
              <InputNewHumanLanguage name={humanLanguage.name} level={humanLanguage.level} />
              <ActionButton variant="formSubmit" className="mt-0 h-fit py-1 px-6 bg-red-600 hover:bg-red-600/80 duration-75" onClick={(e) => removeHumanLanguage(e, index)}><TrashBinSvg className="size-4 h-5" /></ActionButton>
            </div>
          )
        })}
        <AddItemButton onClick={addHumanLanguageInput}>Add language</AddItemButton>
      </div>
    </div>
  )
}

