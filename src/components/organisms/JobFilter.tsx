import React, { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react'
import ActionButton from '../atoms/ActionButton'
import TextInput from '../atoms/TextInput'
import NumberInput from '../atoms/NumberInput';
import { ContractType, Filter, JobType, WorkhourType } from '@/app/lib/definitions';
import ButtonCheckboxFilter from '../molecules/ButtonCheckboxFilter';
import CityFilter from '../molecules/CityFilter';
import TechnologiesPicker from '../molecules/TechnologiesPicker';
import HumanLanguagesPicker from '../molecules/HumanLanguagesPicker';

type Props = {
  filter: Filter
  handleTitle: (event: ChangeEvent<HTMLInputElement>) => void
  handleCompanyName: (event: ChangeEvent<HTMLInputElement>) => void
  handleMinSalary: (event: ChangeEvent<HTMLInputElement>) => void
  handleMaxSalary: (event: ChangeEvent<HTMLInputElement>) => void
  handleJobType: (jobType: JobType) => void
  handleWorkhourType: (workhourType: WorkhourType) => void
  handleContractType: (contractType: ContractType) => void
  handleCity: (city: string) => void
  addTechnology: () => void
  removeTechnology: (e: MouseEvent<HTMLButtonElement>, i: number) => void
  handleTechnologyName: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  handleTechnologyExperience: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
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
  handleCity,
  addTechnology,
  removeTechnology,
  handleTechnologyName,
  handleTechnologyExperience,
  submitFilter }: Props) {
  const [cities, setCities] = useState<string[]>(["New Jersey", "Berlin"]);

  const fetchCities = useCallback(async () => {
    await fetch('/api/cities', { method: "GET" })
      .then(async (res) => {
        const data = await res.json();
        console.log("Got data", data);
        setCities((_cur) => [...data.cities]);
      })
  }, []);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  return (
    <div className={`flex flex-col w-1/6 gap-4 bg-neutral-900 p-4
text-black dark:text-white rounded-md min-w-fit max-h-fit`}>
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
            onClick={() => handleJobType("remote")}>
            Remote
          </ButtonCheckboxFilter>
          <ButtonCheckboxFilter
            onClick={() => handleJobType("hybrid")}>
            Hybrid
          </ButtonCheckboxFilter>
          <ButtonCheckboxFilter
            onClick={() => handleJobType("stationary")}>
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
            onClick={() => handleWorkhourType("full")}>
            Full-time
          </ButtonCheckboxFilter>
          <ButtonCheckboxFilter
            onClick={() => handleWorkhourType("part")}>
            Part-time
          </ButtonCheckboxFilter>
          <ButtonCheckboxFilter
            onClick={() => handleWorkhourType("intern")}>
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
            onClick={() => handleContractType("b2b")}>
            B2B
          </ButtonCheckboxFilter>
          <ButtonCheckboxFilter
            onClick={() => handleContractType("contract")}>
            Employment
          </ButtonCheckboxFilter>
        </div>
      </div>
      <CityFilter
        cities={cities}
        handleCity={handleCity} />
      <TechnologiesPicker
        technologies={filter.technologies}
        handleTextInputAction={handleTechnologyName}
        handleNumberInputAction={handleTechnologyExperience}
        addTechnologyAction={addTechnology}
        removeTechnologyAction={removeTechnology}
        includeExperience={false} />
      <HumanLanguagesPicker
        humanLanguages={filter.humanLanguages}
        setHumanLanguagesAction={() => { }}
        includeExperience={true}
      />
      <ActionButton
        variant="alt"
        onClick={() => submitFilter(filter)}>
        Filter
      </ActionButton>
    </div>
  )
}

