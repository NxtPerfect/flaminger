import TextAreaInput from '@/components/atoms/TextAreaInput'
import TextInput from '@/components/atoms/TextInput'
import CityPicker from '@/components/molecules/CityPicker'
import EmploymentTypePicker from '@/components/molecules/EmploymentTypePicker'
import SalaryRange from '@/components/molecules/SalaryRange'
import TechnologiesPicker from '@/components/molecules/TechnologiesPicker'
import React from 'react'

export default function page() {
  return (
    <form
      className="flex flex-col gap-2 bg-neutral-800 rounded-md px-8 py-4 min-w-[30ch] max-w-[80ch]"
    >
      <TextInput name="jobName" placeholder="Junior React Developer" required={true} pattern="^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$">Job name:</TextInput>
      <TextAreaInput name="description" required={true} placeholder="Our flexible and dynamic team is looking for a passionate developer.">Description:</TextAreaInput>
      <SalaryRange />
      <CityPicker />
      <EmploymentTypePicker />
      <TechnologiesPicker />
    </form>
  )
}

