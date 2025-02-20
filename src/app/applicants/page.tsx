"use client";
import { useCallback, useEffect, useState } from 'react'
import { SelectHumanLanguagesToUsers, SelectJobs, SelectJobsToUsers, SelectTechnologiesToUsers, SelectUser } from '@/db/schema';
import SkeletonCheckApplications from '@/components/molecules/SkeletonCheckApplications';
import ErrorMessage from '@/components/atoms/ErrorMessage';
import ActionButton from '@/components/ActionButton';

type ResponseData = {
  jobs_table: SelectJobs
  jobs_to_users_table: SelectJobsToUsers
  user: SelectUser
  technologies: SelectTechnologiesToUsers[]
  human_languages: SelectHumanLanguagesToUsers[]
}

type Application = {
  job: SelectJobs
  candidate: {
    personalInformation: SelectUser,
    technologies: SelectTechnologiesToUsers[],
    humanLanguages: SelectHumanLanguagesToUsers[],
  }
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
  async function handleReview(userId: number, jobId: number, status: "accepted" | "rejected") {
    const formData = new FormData();
    formData.set("status", status);
    formData.set("jobId", jobId.toString());
    formData.set("userId", userId.toString());
    await fetch('/api/applications/review', {
      method: "POST",
      body: formData
    })
      .then(() => {
        const filteredApplications = applications
          .filter(application =>
            application.job.id !== jobId &&
            application.candidate.personalInformation.id !== userId)
        setApplications(filteredApplications);
      })
      .catch(err => setError(err));
  }

  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const getApplications = useCallback(async () => {
    setIsLoading(true);
    await fetch('/api/applications', { method: "POST" })
      .then(async (res) => {
        const responseJson = await res.json();
        setApplicationsFromResponse(responseJson.data);
        setIsLoading(false);
      })
      .catch(err => setError(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            candidate: {
              personalInformation: { ...currentApplication.user },
              technologies: currentApplication.technologies,
              humanLanguages: currentApplication.human_languages
            }
          }
          ]
      );
    }
    return;
  }

  return (
    <>
      {isLoading && <SkeletonCheckApplications />}
      {applications.length === 0 && <p>It&apos;s empty, add more job offers and wait for candidates to apply!</p>}
      <div>
        Job offer info
        <div>
          {applications && applications.map((curApplication, index) => {
            const job = curApplication.job;
            const candidate = curApplication.candidate;
            return (
              <div key={index}>
                <div>
                  {job.title}
                </div>
                <div>
                  {job.description}
                </div>
                <div>
                  {candidate.personalInformation.firstname} {candidate.personalInformation.surname}
                </div>
                <div>
                  {candidate.personalInformation.city}
                </div>
                <div>
                  Technologies:
                  <ul>
                    {candidate.technologies.map((tech: SelectTechnologiesToUsers, index: number) => {
                      return (
                        <li key={index}>
                          {tech.name} {tech.experience}y
                        </li>);
                    }
                    )}
                  </ul>
                </div>
                <div>
                  Languages:
                  <ul>
                    {candidate.humanLanguages.map((lang: SelectHumanLanguagesToUsers, index: number) => {
                      return (
                        <li key={index}>
                          {lang.name} {lang.level}
                        </li>);
                    }
                    )}
                  </ul>
                </div>
                <ActionButton variant="formSubmit"
                  onClick={() =>
                    handleReview(candidate.personalInformation.id, curApplication.job.id, "accepted")
                  }>Accept</ActionButton>
                <ActionButton variant="formSubmit"
                  onClick={() =>
                    handleReview(candidate.personalInformation.id, curApplication.job.id, "rejected")
                  }>Reject</ActionButton>
              </div>
            )
          })
          }
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    </>
  )
}

