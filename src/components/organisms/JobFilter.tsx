import React, { ChangeEvent } from 'react'
import ActionButton from '../atoms/ActionButton'
import TextInput from '../atoms/TextInput'
import NumberInput from '../atoms/NumberInput';
import { ContractType, Filter, JobType, WorkhourType } from '@/app/lib/definitions';

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
    console.log("Adding remote");
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
      <div className="flex flex-col border-2 border-neutral-600 p-2 rounded-md">
        <h3 className="font-bold">
          Job Type
        </h3>
        <div className="mt-1 flex flex-row flex-wrap gap-2">
          <ActionButton
            variant="checkbox"
            onClick={handleRemoteJobType}>
            Remote
          </ActionButton>
          <ActionButton
            variant="checkbox"
            onClick={handleHybridJobType}>
            Hybrid
          </ActionButton>
          <ActionButton
            variant="checkbox"
            onClick={handleStationaryJobType}>
            Stationary
          </ActionButton>
        </div>
      </div>
      <div className="flex flex-col border-2 border-neutral-600 p-2 rounded-md">
        <h3 className="font-bold">
          Workhour Type
        </h3>
        <div className="mt-1 flex flex-row flex-wrap gap-2">
          <ActionButton
            variant="checkbox"
            onClick={handleFullWorkhourType}>
            Full-time
          </ActionButton>
          <ActionButton
            variant="checkbox"
            onClick={handlePartWorkhourType}>
            Part-time
          </ActionButton>
          <ActionButton
            variant="checkbox"
            onClick={handleInternWorkhourType}>
            Internship
          </ActionButton>
        </div>
      </div>
      <div className="flex flex-col border-2 border-neutral-600 p-2 rounded-md">
        <h3 className="font-bold">
          Contract Type
        </h3>
        <div className="mt-1 flex flex-row flex-wrap gap-2">
          <ActionButton
            variant="checkbox"
            onClick={handleB2BContractType}>
            B2B
          </ActionButton>
          <ActionButton
            variant="checkbox"
            onClick={handleEmploymentContractType}>
            Employment Contract
          </ActionButton>
        </div>
      </div>
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

