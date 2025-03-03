import Pagination from '@/components/molecules/Pagination';
import JobList from '@/components/organisms/JobList';
import { cookies } from 'next/headers'
import React from 'react'

export default async function Offers() {
  const cookieStore = await cookies();
  const isNotLoggedIn = cookieStore.get("session")?.value ? false : true;
  return (
    <div>
      <JobList isNotLoggedIn={isNotLoggedIn} />
      <Pagination />
    </div>
  )
}
