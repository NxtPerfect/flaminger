"use client";
import React, { Dispatch, MouseEvent, SetStateAction } from 'react'
import AddItemButton from './AddItemButton'
import InputNewTechnology from '../molecules/InputNewTechnology';
import TrashBinSvg from './TrashBinSvg';
import { Technology } from '@/app/lib/definitions';
import ActionButton from '../atoms/ActionButton';

type Props = {
  technologies: Technology[]
  setTechnologiesAction: Dispatch<SetStateAction<Technology[]>>
  children?: React.ReactNode
}

export default function TechnologiesPicker({ technologies, setTechnologiesAction, children }: Props) {

  function addTechnologyInput() {
    if (technologies.length > 20) return;
    setTechnologiesAction(() => [...technologies, { name: "Javascript", experience: 2 }]);
  }

  function removeTechnology(e: MouseEvent<HTMLButtonElement>, index: number) {
    e.preventDefault();
    if (technologies.length == 0) return;
    setTechnologiesAction(() => technologies.filter((_, techIndex) => techIndex !== index));
  }

  return (
    <div className="flex flex-col">
      <label htmlFor="technologies">{children ?? "Required Technologies:"}</label>
      <div className={`border-2 border-neutral-200
        dark:border-neutral-700 px-4 py-2 rounded-md`}>
        {technologies && "Technology name | Years of Experience"}
        {technologies.map((technology, index) => {
          return (
            <div key={index} className="flex flex-row items-center">
              <InputNewTechnology
                name={technology.name}
                experience={technology.experience} />
              <ActionButton
                variant="formSubmit"
                className={`mt-0 h-fit py-1 px-6 bg-red-600
                hover:bg-red-600/80 duration-75`}
                onClick={(e) => removeTechnology(e, index)}>
                <TrashBinSvg className="size-4 h-5" imageAlt="Remove item" />
              </ActionButton>
            </div>
          )
        })}
        <AddItemButton onClick={addTechnologyInput}>Add technology</AddItemButton>
      </div>
    </div>
  )
}

