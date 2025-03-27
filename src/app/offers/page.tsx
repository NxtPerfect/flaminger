"use client";
import Pagination from '@/components/molecules/Pagination';
import JobFilter from '@/components/organisms/JobFilter';
import JobList from '@/components/organisms/JobList';
import { useOffers } from '@/hooks/useOffers';
import { AuthContext } from '@/providers/AuthProvider';
import React, { useContext } from 'react'
import { useFilter } from '@/hooks/useFilter';

export default function Offers() {
  const auth = useContext(AuthContext);
  const isLoggedIn = auth?.isLoggedIn ?? false;
  const {
    isLoading: isOfferLoading,
    offset,
    setOffset,
    offers,
    setOffers,
    technologies,
    setTechnologies,
    humanLanguages,
    setHumanLanguages,
    maxPages,
    setMaxPages
  } = useOffers();
  const {
    handleTitle,
    handleCompanyName,
    handleMinSalary,
    handleMaxSalary,
    createFetchUrlFromFilter
  } = useFilter();

  function submitFilter() {
    const controller = new AbortController;
    const signal = controller.signal;
    const apiUrl = "/api/offers/" + offset + createFetchUrlFromFilter();

    fetch(apiUrl,
      {
        method: "GET",
        credentials: "include",
        signal
      })
      .then(async (res) => {
        const data = await res.json();
        setOffers(() => [...data.offers]);
        setTechnologies(() => [...data.tech]);
        setHumanLanguages(() => [...data.lang]);
        setMaxPages(() => data.count);
      })
      .finally(() => {
        controller.abort();
      });
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
          isLoading={isOfferLoading}
          isNotLoggedIn={!isLoggedIn}
          offers={offers}
          technologies={technologies}
          humanLanguages={humanLanguages} />
      </div>
      <Pagination
        offset={offset}
        setOffsetAction={setOffset}
        maxPages={maxPages} />
    </div>
  )
}
