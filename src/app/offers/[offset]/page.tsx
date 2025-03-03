import JobFilters from '@/components/JobFilters'
import JobList from '@/components/JobList'
import Pagination from '@/components/molecules/Pagination';
import { cookies } from 'next/headers'
import React from 'react'

export default async function Offers() {
  const cookieStore = await cookies();
  const isNotLoggedIn = cookieStore.get("session")?.value ? false : true;
  return (
    <div>
      <JobFilters />
      <JobList isNotLoggedIn={isNotLoggedIn} />
      <Pagination />
    </div>
  )
}
