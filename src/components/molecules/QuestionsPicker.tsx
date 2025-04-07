"use client";
import React, { MouseEvent } from 'react'
import AddItemButton from './AddItemButton'
import TrashBinSvg from './TrashBinSvg';
import { Question } from '@/app/lib/definitions';
import ActionButton from '../atoms/ActionButton';
import InputNewQuestion from './InputNewQuestion';

type Props = {
  questions: Question[]
  handleQuestionContentInputAction: (e: React.ChangeEvent<HTMLInputElement>, i: number) => void
  handleQuestionTypeInputAction: (e: React.ChangeEvent<HTMLSelectElement>, i: number) => void
  addQuestionAction: () => void
  removeQuestionAction: (e: MouseEvent<HTMLButtonElement>, i: number) => void
  children?: React.ReactNode
}

export default function QuestionsPicker({
  questions,
  handleQuestionContentInputAction,
  handleQuestionTypeInputAction,
  addQuestionAction,
  removeQuestionAction,
  children
}: Props) {

  return (
    <div className="flex flex-col">
      <label htmlFor="questions">{children ?? "Questions for applicants:"}</label>
      <div className={`border-2 border-neutral-200
        dark:border-neutral-700 px-4 py-2 rounded-md`}>
        {questions.map((_, index) => {
          return (
            <div key={index} className="flex flex-row items-center">
              <InputNewQuestion
                index={index}
                handleContentInput={handleQuestionContentInputAction}
                handleTypeInput={handleQuestionTypeInputAction} />
              <ActionButton
                variant="formSubmit"
                className={`mt-0 h-fit py-1 px-6 bg-red-600
                hover:bg-red-600/80 duration-75`}
                onClick={(e) => removeQuestionAction(e, index)}>
                <TrashBinSvg className="size-4 h-5" imageAlt="Remove icon" />
              </ActionButton>
            </div>
          )
        })}
        <AddItemButton onClick={addQuestionAction}>
          Add question
        </AddItemButton>
      </div>
    </div>
  )
}

