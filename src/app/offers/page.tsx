"use client";
import Pagination from '@/components/molecules/Pagination';
import JobFilter from '@/components/organisms/JobFilter';
import JobList from '@/components/organisms/JobList';
import { useOffers } from '@/hooks/useOffers';
import { AuthContext } from '@/providers/AuthProvider';
import React, { useContext } from 'react'
import { useFiltering } from '@/hooks/useFiltering';

export default function Offers() {
  const auth = useContext(AuthContext);
  const isLoggedIn = auth?.isLoggedIn ?? false;
  const {
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
    addHumanLanguage,
    removeHumanLanguage,
    handleHumanLanguageNameInput,
    handleHumanLanguageLevelInput,
    filter
  } = useFiltering();
  const {
    isLoading,
    offset,
    setOffset,
    offers,
    fetchOffers,
    technologies,
    humanLanguages,
    maxPages
  } = useOffers(filter);

  return (
    <div>
      <div className="flex flex-row">
        <JobFilter
          filter={filter}
          handleTitle={handleTitle}
          handleCompanyName={handleCompanyName}
          handleMinSalary={handleMinSalary}
          handleMaxSalary={handleMaxSalary}
          handleJobType={handleJobType}
          handleWorkhourType={handleWorkhourType}
          handleContractType={handleContractType}
          handleCity={handleCity}
          addTechnology={addTechnology}
          removeTechnology={removeTechnology}
          handleTechnologyName={handleTechnologyName}
          addHumanLanguage={addHumanLanguage}
          removeHumanLanguage={removeHumanLanguage}
          handleHumanLanguageNameInput={handleHumanLanguageNameInput}
          handleHumanLanguageLevelInput={handleHumanLanguageLevelInput}
          submitFilter={fetchOffers}
        />
        <JobList
          isLoading={isLoading}
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
