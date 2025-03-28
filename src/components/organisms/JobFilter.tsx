import React, { ChangeEvent } from 'react'
import ActionButton from '../atoms/ActionButton'
import TextInput from '../atoms/TextInput'
import NumberInput from '../atoms/NumberInput';
import { ContractType, Filter, JobType, WorkhourType } from '@/app/lib/definitions';
import Select from '../atoms/Select';
import Option from '../atoms/Option';
import ButtonCheckboxFilter from '../molecules/ButtonCheckboxFilter';

type Props = {
  filter: Filter
  handleTitle: (event: ChangeEvent<HTMLInputElement>) => void
  handleCompanyName: (event: ChangeEvent<HTMLInputElement>) => void
  handleMinSalary: (event: ChangeEvent<HTMLInputElement>) => void
  handleMaxSalary: (event: ChangeEvent<HTMLInputElement>) => void
  handleJobType: (jobType: JobType) => void
  handleWorkhourType: (workhourType: WorkhourType) => void
  handleContractType: (contractType: ContractType) => void
  submitFilter: (filter: Filter) => void
}

export default function JobFilter({
  filter,
  handleTitle,
  handleCompanyName,
  handleMinSalary,
  handleMaxSalary,
  handleJobType,
  handleWorkhourType,
  handleContractType,
  submitFilter }: Props) {
  function handleButton() {
    submitFilter(filter);
  }

  function handleRemoteJobType() {
    handleJobType("remote");
  }
  function handleHybridJobType() {
    handleJobType("hybrid");
  }
  function handleStationaryJobType() {
    handleJobType("stationary");
  }
  function handleFullWorkhourType() {
    handleWorkhourType("full");
  }
  function handlePartWorkhourType() {
    handleWorkhourType("part");
  }
  function handleInternWorkhourType() {
    handleWorkhourType("intern");
  }
  function handleB2BContractType() {
    handleContractType("b2b");
  }
  function handleEmploymentContractType() {
    handleContractType("contract");
  }

  return (
    <div className={`flex flex-col w-1/6 gap-4 bg-neutral-900 p-4
text-black dark:text-white rounded-md min-w-fit`}>
      <div>
        <label htmlFor="title">
          Title
        </label>
        <TextInput
          name="title"
          placeholder="Webdeveloper"
          onChange={handleTitle} />
      </div>
      <div>
        <label htmlFor="company">
          Company
        </label>
        <TextInput
          name="company"
          placeholder="Microsoft"
          onChange={handleCompanyName} />
      </div>
      <div>
        <label htmlFor="minSalary">
          Minimum Salary
        </label>
        <NumberInput
          name="minSalary"
          placeholder="$5,000"
          min={0}
          max={999999}
          onChange={handleMinSalary} />
        <label htmlFor="maxSalary">
          Maximum Salary
        </label>
        <NumberInput
          name="maxSalary"
          placeholder="$50,000"
          min={0}
          max={999999}
          onChange={handleMaxSalary} />
      </div>
      <div className="flex flex-col border-2 border-neutral-600 p-2 rounded-md">
        <h3 className="font-bold">
          Job Type
        </h3>
        <div className="mt-1 flex flex-row flex-wrap gap-2">
          <ButtonCheckboxFilter
            onClick={handleRemoteJobType}>
            Remote
          </ButtonCheckboxFilter>
          <ButtonCheckboxFilter
            onClick={handleHybridJobType}>
            Hybrid
          </ButtonCheckboxFilter>
          <ButtonCheckboxFilter
            onClick={handleStationaryJobType}>
            Stationary
          </ButtonCheckboxFilter>
        </div>
      </div>
      <div className="flex flex-col border-2 border-neutral-600 p-2 rounded-md">
        <h3 className="font-bold">
          Workhour Type
        </h3>
        <div className="mt-1 flex flex-row flex-wrap gap-2">
          <ButtonCheckboxFilter
            onClick={handleFullWorkhourType}>
            Full-time
          </ButtonCheckboxFilter>
          <ButtonCheckboxFilter
            onClick={handlePartWorkhourType}>
            Part-time
          </ButtonCheckboxFilter>
          <ButtonCheckboxFilter
            onClick={handleInternWorkhourType}>
            Internship
          </ButtonCheckboxFilter>
        </div>
      </div>
      <div className="flex flex-col border-2 border-neutral-600 p-2 rounded-md">
        <h3 className="font-bold">
          Contract Type
        </h3>
        <div className="mt-1 flex flex-row flex-wrap gap-2">
          <ButtonCheckboxFilter
            onClick={handleB2BContractType}>
            B2B
          </ButtonCheckboxFilter>
          <ButtonCheckboxFilter
            onClick={handleEmploymentContractType}>
            Employment
          </ButtonCheckboxFilter>
        </div>
      </div>
      <div>
        <label htmlFor="city">
          City
        </label>
        <Select name="city">
          <Option value="NewJersey" >
            New Jersey
          </Option>
          <Option value="Berlin" >
            Berlin
          </Option>
        </Select>
      </div>
      <ActionButton
        variant="alt"
        onClick={handleButton}>
        Filter
      </ActionButton>
    </div>
  )
}

