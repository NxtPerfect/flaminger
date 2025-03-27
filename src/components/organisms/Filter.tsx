import React, { ChangeEvent, useState } from 'react'
import ActionButton from '../atoms/ActionButton'
import TextInput from '../atoms/TextInput'
import { type Filter } from '@/app/lib/definitions';
import NumberInput from '../atoms/NumberInput';

export default function Filter() {
  const defaultFilter: Filter = {
    title: "any",
    companyName: "any",
    minSalary: 0,
    maxSalary: 999999,
    jobType: "any",
    contractType: "any",
    workhourType: "any",
    city: "any"
  }
  const [filter, setFilter] = useState<Filter>(defaultFilter);

  function handleTitle(event: ChangeEvent<HTMLInputElement>) {
    const title = event.currentTarget.value;
    setFilter((cur) => {
      return { ...cur, title: title };
    });
  }

  function handleCompanyName(event: ChangeEvent<HTMLInputElement>) {
    const companyName = event.currentTarget.value;
    setFilter((cur) => {
      return { ...cur, companyName: companyName };
    });
  }

  function handleMinSalary(event: ChangeEvent<HTMLInputElement>) {
    const minSalary = event.currentTarget.valueAsNumber ?? 0;
    setFilter((cur) => {
      return { ...cur, minSalary: minSalary };
    });
  }

  function handleMaxSalary(event: ChangeEvent<HTMLInputElement>) {
    const maxSalary = event.currentTarget.valueAsNumber ?? 999999;
    setFilter((cur) => {
      return { ...cur, maxSalary: maxSalary };
    });
  }

  function createFetchUrlFromFilter() {
    return `/api/offers/1/${filter.title}/${filter.companyName}/${filter.minSalary}/${filter.maxSalary}/${filter.jobType}/${filter.workhourType}/${filter.contractType}/${filter.city}`;
  }

  function submitFilter() {
    const controller = new AbortController;
    const signal = controller.signal;
    const fetchUrl = createFetchUrlFromFilter();

    fetch(fetchUrl,
      {
        method: "GET",
        credentials: "include",
        signal
      })
      .then(async (res) => {
        const _data = await res.json();
        // TODO: Update offers in list
      })
      .finally(() => controller.abort());
  }

  return (
    <div className={`flex flex-col w-1/6 gap-4 bg-neutral-900 p-4
text-black dark:text-white rounded-md`}>
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
      <ActionButton variant="alt" onClick={submitFilter}>
        Filter
      </ActionButton>
    </div>
  )
}

