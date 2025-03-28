import React, { ChangeEvent } from 'react'
import ActionButton from '../atoms/ActionButton'
import TextInput from '../atoms/TextInput'
import NumberInput from '../atoms/NumberInput';
import { Filter } from '@/app/lib/definitions';

type Props = {
  filter: Filter
  handleTitle: (event: ChangeEvent<HTMLInputElement>) => void
  handleCompanyName: (event: ChangeEvent<HTMLInputElement>) => void
  handleMinSalary: (event: ChangeEvent<HTMLInputElement>) => void
  handleMaxSalary: (event: ChangeEvent<HTMLInputElement>) => void
  submitFilter: (filter: Filter) => void
}

export default function JobFilter({ filter, handleTitle, handleCompanyName, handleMinSalary, handleMaxSalary, submitFilter }: Props) {
  function handleButton() {
    submitFilter(filter);
  }

  return (
    <div className={`flex flex-col w-1/6 gap-4 bg-neutral-900 p-4
text-black dark:text-white rounded-md min-w-fit`}>
      <TextInput
        name="title"
        placeholder="Webdeveloper"
        onChange={handleTitle} />
      <TextInput
        name="company"
        placeholder="Microsoft"
        onChange={handleCompanyName} />
      <NumberInput
        name="minSalary"
        placeholder="$5,000"
        min={0}
        max={999999}
        onChange={handleMinSalary} />
      <NumberInput
        name="maxSalary"
        placeholder="$50,000"
        min={0}
        max={999999}
        onChange={handleMaxSalary} />
      <input type="checkbox" name="remote" />
      <input type="checkbox" name="hybrid" />
      <input type="checkbox" name="stationary" />
      <input type="checkbox" name="part-time" />
      <input type="checkbox" name="full-time" />
      <input type="checkbox" name="internship" />
      <input type="checkbox" name="B2B" />
      <input type="checkbox" name="employmentContract" />
      <select name="city">
        <option value="NewJersey" >
          New Jersey
        </option>
        <option value="Berlin" >
          Berlin
        </option>
      </select>
      <ActionButton
        variant="alt"
        onClick={handleButton}>
        Filter
      </ActionButton>
    </div>
  )
}

