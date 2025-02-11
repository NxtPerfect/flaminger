"use client";
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import SkeletonProfile from '@/components/placeholders/SkeletonProfile';
import { CompletedApplication, DatabaseCompletedApplication, Offer, PendingApplication, StatisticsForUserApplications, StatisticsForUserApplicationsFromDatabase, User } from '@/app/lib/definitions';
import StatisticsUserTable from '@/components/organisms/StatisticsUserTable';
import JobApplicationsForUserProfile from '@/components/organisms/JobApplicationsForUserProfile';

export default function Profile() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [statistics, setStatistics] = useState<StatisticsForUserApplications>();
  const [pendingApplications, setPendingApplications] = useState<Partial<Offer>[]>([]);
  const [completedApplications, setCompletedApplications] = useState<CompletedApplication[]>([]);

  const getProfile = useCallback(async () => {
    setIsLoading(true);
    await fetch('/api/profile', { method: "POST" })
      .then(async (res) => {
        const responseJson = await res.json();
        setUserDataFromApi(responseJson.userData);
        setStatisticsFromApi(responseJson.statistics);
        setPendingApplicationsFromApi(responseJson.pendingApplications);
        setCompletedApplicationsFromApi(responseJson.completedApplications);
        setIsLoading(false);
      })
  }, []);

  useEffect(() => {
    getProfile()
  }, [getProfile]);

  function setUserDataFromApi(userRawData: User) {
    const userData: User = {
      id: userRawData.id,
      firstname: userRawData.firstname,
      surname: userRawData.surname,
      password: "",
      email: "",
      mailingConsent: userRawData.mailingConsent,
      isEmployer: userRawData.isEmployer
    }
    setUser(userData);
  }

  function setStatisticsFromApi(statisticsRaw: StatisticsForUserApplicationsFromDatabase) {
    const statisticsForUser: StatisticsForUserApplications = {
      accepted: statisticsRaw.accepted.count,
      rejected: statisticsRaw.rejected.count,
      total: statisticsRaw.total.count,
      responseRate: ((statisticsRaw.accepted.count + statisticsRaw.rejected.count) / (statisticsRaw.total.count) * 100).toFixed(2)
    }
    setStatistics(statisticsForUser);
  }

  function setPendingApplicationsFromApi(pendingApplicationsRaw: PendingApplication[]) {
    for (let i = 0; i < pendingApplicationsRaw.length; i++) {
      const singleApplication: Partial<Offer> = pendingApplicationsRaw[i].jobsTable;
      const companyName = pendingApplicationsRaw[i].company;
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

  function setCompletedApplicationsFromApi(completedApplicationsRaw: DatabaseCompletedApplication[]) {
    for (let i = 0; i < completedApplicationsRaw.length; i++) {
      const singleApplication: Offer = completedApplicationsRaw[i].jobsTable;
      const isAccepted = completedApplicationsRaw[i].isAccepted;
      const rejectionReason = completedApplicationsRaw[i].rejectionReason;
      const companyName = completedApplicationsRaw[i].company;
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

  return (
    <div>
      {isLoading ?
        (<SkeletonProfile />)
        :
        (<>
          <div className="flex flex-row w-[50svw]">
            <Image src="/profile/profile.png" alt="profile picture" width={350} height={350} />
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold">{user?.isEmployer ? "Employer" : "User"} Information</h2>
              <div className="flex flex-col w-36">
                <div className="flex w-full justify-center gap-2">
                  <span>{user?.firstname}</span>
                  <span>{user?.surname}</span>
                </div>
              </div>
              <h2 className="mt-6 text-xl font-semibold">Statistics</h2>
              <StatisticsUserTable statistics={statistics} />
            </div>
          </div>
          <JobApplicationsForUserProfile pendingApplications={pendingApplications} completedApplications={completedApplications} />
        </>
        )
      }
    </div>
  )
}

