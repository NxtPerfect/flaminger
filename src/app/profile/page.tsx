"use client";
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import SkeletonProfile from '@/components/placeholders/SkeletonProfile';
import { CompletedApplication, DatabaseCompletedApplication, HumanLanguage, Offer, PendingApplication, StatisticsForUserApplications, StatisticsForUserApplicationsFromDatabase, Technology, User } from '@/app/lib/definitions';
import JobApplicationsForUserProfile from '@/components/organisms/JobApplicationsForUserProfile';
import UserLanguages from '@/components/organisms/UserLanguages';
import UserTechnologies from '@/components/organisms/UserTechnologies';
import StatisticsUserPieChart from '@/components/organisms/StatisticsUserPieChart';
import LinkButton from '@/components/organisms/LinkButton';
import ProfilePicture from '@/components/atoms/ProfilePicture';

export default function Profile() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [statistics, setStatistics] = useState<StatisticsForUserApplications>();
  const [pendingApplications, setPendingApplications] = useState<Partial<Offer>[]>([]);
  const [completedApplications, setCompletedApplications] = useState<CompletedApplication[]>([]);
  const [languages, setLanguages] = useState<HumanLanguage[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);

  const getProfile = useCallback(async () => {
    setIsLoading(true);
    await fetch('/api/profile', { method: "POST" })
      .then(async (res) => {
        const responseJson = await res.json();
        setUserDataFromApi(responseJson.userData);
        setStatisticsFromApi(responseJson.statistics);
        setPendingApplicationsFromApi(responseJson.pendingApplications);
        setCompletedApplicationsFromApi(responseJson.completedApplications);
        setLanguagesFromApi(responseJson.humanLanguages);
        setTechnologiesFromApi(responseJson.technologies);
        setIsLoading(false);
      })
  }, []);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  function setUserDataFromApi(rawUserData: User) {
    const userData: User = {
      id: rawUserData.id,
      firstname: rawUserData.firstname,
      surname: rawUserData.surname,
      password: "",
      email: "",
      mailingConsent: rawUserData.mailingConsent,
      isEmployer: rawUserData.isEmployer
    }
    setUser(userData);
  }

  function setStatisticsFromApi(rawStatistics: StatisticsForUserApplicationsFromDatabase) {
    const statisticsForUser: StatisticsForUserApplications = {
      accepted: rawStatistics.accepted.count,
      rejected: rawStatistics.rejected.count,
      total: rawStatistics.total.count,
      responseRate: ((rawStatistics.accepted.count + rawStatistics.rejected.count) / (rawStatistics.total.count) * 100).toFixed(2)
    }
    setStatistics(statisticsForUser);
  }

  function setPendingApplicationsFromApi(rawPendingApplications: PendingApplication[]) {
    for (let i = 0; i < rawPendingApplications.length; i++) {
      const singleApplication: Partial<Offer> = rawPendingApplications[i].jobsTable;
      const companyName = rawPendingApplications[i].company;
      const application: Partial<Offer> = {
        id: singleApplication.id,
        company: companyName,
        title: singleApplication.title,
        description: singleApplication.description,
        byCompanyId: singleApplication.byCompanyId,
        isClosed: false
      }
      setPendingApplications((pending) => [...pending, application]);
    }
  }

  function setCompletedApplicationsFromApi(rawCompletedApplications: DatabaseCompletedApplication[]) {
    for (let i = 0; i < rawCompletedApplications.length; i++) {
      const singleApplication: Offer = rawCompletedApplications[i].jobsTable;
      const isAccepted = rawCompletedApplications[i].isAccepted;
      const rejectionReason = rawCompletedApplications[i].rejectionReason;
      const companyName = rawCompletedApplications[i].company;
      const application: CompletedApplication = {
        id: singleApplication.id,
        company: companyName,
        title: singleApplication.title,
        description: singleApplication.description,
        byCompanyId: singleApplication.byCompanyId,
        isAccepted: isAccepted,
        rejectionReason: rejectionReason,
      };
      setCompletedApplications((completed) => [...completed, application]);
    }
  }

  function setLanguagesFromApi(rawLanguages: HumanLanguage[]) {
    for (let i = 0; i < rawLanguages.length; i++) {
      const language: HumanLanguage = {
        name: rawLanguages[i].name,
        level: rawLanguages[i].level,
      }
      setLanguages((current) => [...current, language]);
    }
  }

  function setTechnologiesFromApi(rawTechnologies: Technology[]) {
    for (let i = 0; i < rawTechnologies.length; i++) {
      const tech: Technology = {
        name: rawTechnologies[i].name,
        experience: rawTechnologies[i].experience,
      }
      setTechnologies((current) => [...current, tech]);
    }
  }

  return (
    <div>
      {isLoading ?
        (<SkeletonProfile />)
        :
        (<>
          <div className="flex flex-col rounded-2xl bg-neutral-800/60 p-4 text-white dark:text-black">
            <div className="grid grid-cols-2 grid-rows-2 gap-4 justify-items-center items-center w-[50svw] p-4">
              <ProfilePicture />
              <div className="self-end justify-self-end">
                <LinkButton variant="profile" className="p-4" href="/profile/edit">
                  Edit Profile
                </LinkButton>
              </div>
              <div className="flex flex-col items-start justify-items-center max-w-[40ch] h-full">
                <div className="flex flex-col w-full items-start justify-self-center gap-2">
                  <span className="text-2xl font-semibold w-full">{user?.firstname} {user?.surname}</span>
                  <span>{user?.city ?? "Denver, Tennesee, United States of America"}</span>
                </div>
              </div>
              <div className="flex flex-col gap-4 h-full">
                <UserLanguages languages={languages} />
                <UserTechnologies technologies={technologies} />
              </div>
              <div className="px-4 col-span-2 h-full bg-neutral-800/60 rounded-md">
                <h2 className="mt-6 text-xl font-semibold text-white dark:text-black">Statistics</h2>
                <StatisticsUserPieChart statistics={statistics} />
              </div>
            </div>
            <JobApplicationsForUserProfile pendingApplications={pendingApplications} completedApplications={completedApplications} />
          </div>
        </>
        )
      }
    </div>
  )
}

