"use client";
import { useCallback, useEffect, useState } from 'react'
import { SelectHumanLanguagesToUsers, SelectJobs, SelectJobsToUsers, SelectTechnologiesToUsers, SelectUser } from '@/db/schema';
import SkeletonCheckApplications from '@/components/molecules/SkeletonCheckApplications';
import ErrorMessage from '@/components/atoms/ErrorMessage';
import ActionButton from '@/components/ActionButton';
import TextInput from '@/components/atoms/TextInput';
import JobInformationApplication from '@/components/molecules/JobInformationApplication';
import CandidateInformationApplication from '@/components/molecules/CandidateInformationApplication';
import MultilineTextInput from '@/components/atoms/MultilineTextInput';

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
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const MIN_LENGTH_REJECTION_REASON = 50;

  async function handleReview(userId: number, jobId: number, status: "accepted" | "rejected") {
    const formData = new FormData();
    formData.set("status", status);
    formData.set("jobId", jobId.toString());
    formData.set("userId", userId.toString());
    formData.set("rejectionReason", rejectionReason);
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
      .then(() => {
        if (applications.length == 0) {
          getApplications();
        }
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
        {applications.length > 0 && "Job offer info"}
        <div>
          {applications && applications.map((curApplication, index) => {
            const job = curApplication.job;
            const candidate = curApplication.candidate;
            return (
              <div key={index}>
                <JobInformationApplication job={job} />
                <CandidateInformationApplication candidate={candidate} />
                <div className="flex flex-row justify-between w-full">
                  <ActionButton variant="formSubmit"
                    onClick={() =>
                      handleReview(candidate.personalInformation.id, curApplication.job.id, "accepted")
                    }>Accept</ActionButton>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                      <ActionButton variant="formSubmit"
                        onClick={() =>
                          handleReview(candidate.personalInformation.id, curApplication.job.id, "rejected")
                        } disabled={rejectionReason.length < MIN_LENGTH_REJECTION_REASON}>Reject</ActionButton>
                      {rejectionReason.length < MIN_LENGTH_REJECTION_REASON && <span>Unlocks in {MIN_LENGTH_REJECTION_REASON - rejectionReason.length} chars</span>}
                      {rejectionReason.length >= MIN_LENGTH_REJECTION_REASON && <span>Unlocked!</span>}
                    </div>
                    <MultilineTextInput className="line-clamp-4" name="rejectionReason" defaultValue={rejectionReason}
                      onChange={
                        (e) =>
                          setRejectionReason(e.currentTarget.value)
                      }>Rejection Reason</MultilineTextInput>
                  </div>
                </div>
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

