"use client";
import Pagination from '@/components/molecules/Pagination';
import JobFilter from '@/components/organisms/JobFilter';
import JobList from '@/components/organisms/JobList';
import { useOffers } from '@/hooks/useOffers';
import { AuthContext } from '@/providers/AuthProvider';
import React, { ChangeEvent, useContext, useState } from 'react'
import { type Filter } from '../lib/definitions';

export default function Offers() {
  const auth = useContext(AuthContext);
  const isLoggedIn = auth?.isLoggedIn ?? false;
  const { isLoading, offset, setOffset, offers, setOffers, technologies, humanLanguages } = useOffers();
  // useFilter?
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
        setOffers(() => [..._data.offers]);
      })
      .finally(() => controller.abort());
  }

  return (
    <div>
      <div className="flex flex-row">
        <JobFilter
          handleTitle={handleTitle}
          handleCompanyName={handleCompanyName}
          handleMinSalary={handleMinSalary}
          handleMaxSalary={handleMaxSalary}
          submitFilter={submitFilter}
        />
        <JobList
          isLoading={isLoading}
          isNotLoggedIn={!isLoggedIn}
          offers={offers}
          technologies={technologies}
          humanLanguages={humanLanguages} />
      </div>
      <Pagination offset={offset} setOffsetAction={setOffset} />
    </div>
  )
}
