"use client";
import React, { MouseEvent } from 'react'
import AddItemButton from './AddItemButton'
import InputNewTechnology from '../molecules/InputNewTechnology';
import TrashBinSvg from './TrashBinSvg';
import ActionButton from '../atoms/ActionButton';
import { Technology } from '@/app/lib/definitions';

type Props = {
  technologies: Technology[]
  handleTextInputAction: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  handleNumberInputAction: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  addTechnologyAction: () => void
  removeTechnologyAction: (e: MouseEvent<HTMLButtonElement>, i: number) => void
  children?: React.ReactNode
  includeExperience?: boolean
}

export default function TechnologiesPicker({
  technologies,
  handleTextInputAction,
  handleNumberInputAction,
  addTechnologyAction,
  removeTechnologyAction,
  children,
  includeExperience = true
}: Props) {
  return (
    <div className="flex flex-col">
      <label htmlFor="technologies">
        {children ?? "Required Technologies:"}
      </label>
      <div className={`flex flex-col border-2 border-neutral-200
        dark:border-neutral-700 px-4 py-2 rounded-md gap-1`}>
        {technologies && "Technology name"}
        {includeExperience && " | Years of Experience"}
        {technologies.map((_technology, index) => {
          return (
            <div key={index} className="flex flex-row items-center">
              <InputNewTechnology
                index={index}
                handleTextInput={handleTextInputAction}
                handleNumberInput={handleNumberInputAction ? (e) => handleNumberInputAction(e, index) : (_e, _i) => { }}
                includeExperience={includeExperience}
              />
              <ActionButton
                variant="formSubmit"
                className={`mt-0 h-fit py-1 px-6 bg-red-600
                hover:bg-red-600/80 duration-75`}
                onClick={(e) => removeTechnologyAction(e, index)}>
                <TrashBinSvg className="size-4 h-5" imageAlt="Remove item" />
              </ActionButton>
            </div>
          )
        })}
        <AddItemButton onClick={addTechnologyAction}>
          Add technology
        </AddItemButton>
      </div>
    </div>
  )
}

