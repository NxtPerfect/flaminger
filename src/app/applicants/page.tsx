"use client";
import { useCallback, useEffect, useState } from 'react'
import { SelectHumanLanguagesToUsers, SelectJobs, SelectJobsToUsers, SelectTechnologiesToUsers, SelectUser } from '@/db/schema';
import SkeletonCheckApplications from '@/components/molecules/SkeletonCheckApplications';
import ErrorMessage from '@/components/atoms/ErrorMessage';
import JobInformationApplication from '@/components/molecules/JobInformationApplication';
import CandidateInformationApplication from '@/components/molecules/CandidateInformationApplication';
import MultilineTextInput from '@/components/atoms/MultilineTextInput';
import { HUMAN_LANGUAGE_LEVELS_TO_VALS } from '../lib/definitions';
import ActionButton from '@/components/atoms/ActionButton';
import MatchingOfferPercentageByCandidate from '@/components/atoms/MatchingOfferPercentageByCandidate';

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

type TechnologyRaw = {
  jobId: number
  name: string
  experience: string
}

type HumanLanguageRaw = {
  jobId: number
  name: string
  level: string
}

export default function Page() {
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [technologyRequirements, setTechnologyRequirements] = useState<TechnologyRaw[]>([]);
  const [humanLanguagesRequirements, setHumanLanguagesRequirements] = useState<HumanLanguageRaw[]>([]);
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
        setTechnologyRequirements(responseJson.tech);
        setHumanLanguagesRequirements(responseJson.langs);
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

  function getMatchingForOffer(job: SelectJobs, candidate: {
    personalInformation: SelectUser
    technologies: SelectTechnologiesToUsers[]
    humanLanguages: SelectHumanLanguagesToUsers[]
  }) {
    const tech = technologyRequirements.filter((t) => t.jobId === job.id);
    const langs = humanLanguagesRequirements.filter((l) => l.jobId === job.id);
    if (tech.length === 0 && langs.length === 0)
      return (100).toFixed(2);

    let match = 0;
    for (let i = 0; i < tech.length; i++) {
      for (let j = 0; j < candidate.technologies.length; j++) {
        if (candidate.technologies[j].name === tech[i].name &&
          candidate.technologies[j].experience <= tech[i].experience) {
          match++;
        }
      }
    }

    for (let i = 0; i < langs.length; i++) {
      for (let j = 0; j < candidate.humanLanguages.length; j++) {
        if (HUMAN_LANGUAGE_LEVELS_TO_VALS[candidate.humanLanguages[j].level.toLowerCase()] >= HUMAN_LANGUAGE_LEVELS_TO_VALS[langs[i].level.toLowerCase()] &&
          candidate.humanLanguages[j].name === langs[i].name) {
          match++;
        }
      }
    }
    const res = (match / (tech.length + langs.length) * 100).toFixed(2);
    return res;
  }

  return (
    <>
      {isLoading &&
        <>
          <SkeletonCheckApplications />
          <SkeletonCheckApplications />
          <SkeletonCheckApplications />
        </>
      }
      {applications.length === 0 && <p>It&apos;s empty, add more job offers and wait for candidates to apply!</p>}
      <div className="w-full">
        <div className="flex flex-col gap-24 w-full justify-center items-center">
          {applications && applications.map((curApplication, index) => {
            const job = curApplication.job;
            const candidate = curApplication.candidate;
            const matching = getMatchingForOffer(job, candidate);
            return (
              <div key={index} className="flex flex-col flex-grow-0 rounded-md
                bg-neutral-200 p-8 w-full items-center gap-4">
                <CandidateInformationApplication candidate={candidate} />
                <MatchingOfferPercentageByCandidate matching={matching} />
                <JobInformationApplication
                  job={job}
                  tech={technologyRequirements
                    .filter((t) => t.jobId === job.id)
                    .map((t) => { return { name: t.name, experience: Number.parseInt(t.experience) }; })}
                  langs={humanLanguagesRequirements
                    .filter((l) => l.jobId === job.id)
                    .map((l) => { return { name: l.name, level: l.level }; })} />
                <div className="flex flex-row gap-8">
                  <div>
                    <ActionButton variant="formSubmit"
                      onClick={() =>
                        handleReview(candidate.personalInformation.id,
                          curApplication.job.id,
                          "accepted")
                      }>
                      Accept
                    </ActionButton>
                  </div>
                  <div className="flex flex-col w-full">
                    <ActionButton variant="formSubmit"
                      onClick={() =>
                        handleReview(candidate.personalInformation.id,
                          curApplication.job.id,
                          "rejected")
                      }
                      disabled={rejectionReason.length < MIN_LENGTH_REJECTION_REASON}>
                      Reject
                    </ActionButton>
                    {rejectionReason.length < MIN_LENGTH_REJECTION_REASON && <span>Unlocks in {MIN_LENGTH_REJECTION_REASON - rejectionReason.length} chars</span>}
                    {rejectionReason.length >= MIN_LENGTH_REJECTION_REASON && <span>Unlocked!</span>}
                  </div>
                  <div className="w-full min-w-[40ch] min-h-[8lh]">
                    <MultilineTextInput className="line-clamp-4" name="rejectionReason" defaultValue={rejectionReason}
                      onChange={
                        (e) =>
                          setRejectionReason(e.currentTarget.value)
                      }>
                      Rejection Reason
                    </MultilineTextInput>
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

