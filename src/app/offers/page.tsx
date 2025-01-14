import JobFilters from '@/components/JobFilters'
import JobList from '@/components/JobList'
import React from 'react'

export default function Offers (props : {}) {
  return (
    <div>
      <JobFilters/>
      <JobList/>
    </div>
  )
}
