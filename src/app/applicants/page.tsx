"use client";
import { useCallback, useEffect, useState } from 'react'
import { SelectJobs, SelectJobsToUsers, SelectUser } from '@/db/schema';

type ResponseData = {
  jobs_table: SelectJobs
  jobs_to_users_table: SelectJobsToUsers
  users_table: SelectUser
}

type Application = {
  job: SelectJobs
  candidate: SelectUser
}

export default function Page() {
  // get all jobs from jobs_to_users
  // where byCompanyId in jobs table
  // matches company user is in
  // then on reject/accept
  // simply change job's status
  //
  // Don't get all offers at once
  // rather batch them by 20?
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const getApplications = useCallback(async () => {
    setIsLoading(true);
    await fetch('/api/applications/review', { method: "POST" })
      .then(async (res) => {
        const responseJson = await res.json();
        setApplicationsFromResponse(responseJson.data);
        setIsLoading(false);
      })
  }, []);

  useEffect(() => {
    getApplications();
  }, [getApplications]);

  function setApplicationsFromResponse(responseJson: ResponseData[]) {
    for (let i = 0; i < responseJson.length; i++) {
      const currentApplication = responseJson[i];
      setApplications(
        (current) =>
          [...current,
          {
            job: currentApplication.jobs_table,
            candidate: currentApplication.users_table
          }
          ]
      );
    }
    console.log(applications);
    return;
  }

  return (
    <>
      {applications.length === 0 && <p>It's empty, add more job offers and wait for candidates to apply!</p>}
      <div>
        Job offer info
        <div>
          {applications && applications.map((curApplication) => {
            return (<div key={curApplication.job.id}>{curApplication.job.title}</div>)
          })
          }
        </div>
      </div>
    </>
  )
}

