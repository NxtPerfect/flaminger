"use client";
import Pagination from '@/components/molecules/Pagination';
import JobList from '@/components/organisms/JobList';
import { AuthContext } from '@/providers/AuthProvider';
import React, { useContext } from 'react'

export default function Offers() {
  const auth = useContext(AuthContext);
  const isLoggedIn = auth?.isLoggedIn ?? false;
  return (
    <div>
      <JobList isNotLoggedIn={!isLoggedIn} />
      <Pagination />
    </div>
  )
}
