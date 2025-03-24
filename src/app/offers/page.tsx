"use client";
import Pagination from '@/components/molecules/Pagination';
import Filter from '@/components/organisms/Filter';
import JobList from '@/components/organisms/JobList';
import { useOffers } from '@/hooks/useOffers';
import { AuthContext } from '@/providers/AuthProvider';
import React, { useContext } from 'react'

export default function Offers() {
  const auth = useContext(AuthContext);
  const isLoggedIn = auth?.isLoggedIn ?? false;
  const { isLoading, offset, setOffset, offers, technologies, humanLanguages } = useOffers();
  return (
    <div>
      <Filter />
      <JobList
        isLoading={isLoading}
        isNotLoggedIn={!isLoggedIn}
        offers={offers}
        technologies={technologies}
        humanLanguages={humanLanguages} />
      <Pagination offset={offset} setOffsetAction={setOffset} />
    </div>
  )
}
