import React, { useState } from 'react'
import TextInput from '../atoms/TextInput'
import Select from '../atoms/Select'
import Option from '../atoms/Option'
import Checkbox from '../atoms/Checkbox'
import InputNewAnswer from './InputNewAnswer'

type Props = {
  index: number
  handleContentInput: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  handleTypeInput: (e: React.ChangeEvent<HTMLSelectElement>, index: number) => void
  // handleAddAnswer: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  // handleRemoveAnswer: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  // handleChangeAnswer: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  includeExperience?: boolean
}

export default function InputNewQuestion({
  index,
  handleContentInput,
  handleTypeInput,
}: Props) {
  const [answers, _setAnswers] = useState<string[]>([]);
  return (
    <div className="flex flex-col gap-3 w-full px-2 h-full">
      <div>
        <TextInput name="content" placeholder="How do you use AI?"
          onChange={(e) => handleContentInput(e, index)} >
          Question
        </TextInput>
      </div>
      <Select name="type" onChange={(e) => handleTypeInput(e, index)}>
        <Option value="singleChoice">Single Choice</Option>
        <Option value="multiChoice">Multiple Choice</Option>
        <Option value="text">Text</Option>
        <Option value="number">Number</Option>
      </Select>
      <Checkbox name="required" className='flex-row-reverse w-fit'>
        Require answer
      </Checkbox>
      <InputNewAnswer
        answers={answers} />
    </div>
  )
}

