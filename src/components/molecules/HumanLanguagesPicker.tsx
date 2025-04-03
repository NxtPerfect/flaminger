"use client";
import React, { MouseEvent } from 'react'
import AddItemButton from './AddItemButton'
import TrashBinSvg from './TrashBinSvg';
import { HumanLanguage } from '@/app/lib/definitions';
import InputNewHumanLanguage from './InputNewHumanLanguage';
import ActionButton from '../atoms/ActionButton';

type Props = {
  humanLanguages: HumanLanguage[]
  handleHumanLanguageNameInputAction: (e: React.ChangeEvent<HTMLInputElement>, i: number) => void
  handleHumanLanguageLevelInputAction: (e: React.ChangeEvent<HTMLInputElement>, i: number) => void
  addHumanLanguageAction: () => void
  removeHumanLanguageAction: (e: MouseEvent<HTMLButtonElement>, i: number) => void
  children?: React.ReactNode
  includeExperience?: boolean
}

export default function HumanLanguagesPicker({
  humanLanguages,
  handleHumanLanguageNameInputAction,
  handleHumanLanguageLevelInputAction,
  addHumanLanguageAction,
  removeHumanLanguageAction,
  children,
  includeExperience
}: Props) {

  return (
    <div className="flex flex-col">
      <label htmlFor="humanLanguages">{children ?? "Required Languages:"}</label>
      <div className={`border-2 border-neutral-200
        dark:border-neutral-700 px-4 py-2 rounded-md`}>
        {humanLanguages && "Language name"}
        {includeExperience && " | Level (A1, Native)"}
        {humanLanguages.map((_, index) => {
          return (
            <div key={index} className="flex flex-row items-center">
              <InputNewHumanLanguage
                index={index}
                handleTextInput={handleHumanLanguageNameInputAction}
                handleNumberInput={handleHumanLanguageLevelInputAction}
                includeExperience={includeExperience ?? false} />
              <ActionButton
                variant="formSubmit"
                className={`mt-0 h-fit py-1 px-6 bg-red-600
                hover:bg-red-600/80 duration-75`}
                onClick={(e) => removeHumanLanguageAction(e, index)}>
                <TrashBinSvg className="size-4 h-5" imageAlt="Remove icon" />
              </ActionButton>
            </div>
          )
        })}
        <AddItemButton onClick={addHumanLanguageAction}>Add language</AddItemButton>
      </div>
    </div>
  )
}

