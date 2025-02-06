"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import SkeletonProfile from '@/components/placeholders/SkeletonProfile';
import { CompletedApplication, PendingApplication, StatisticsForUserApplications, User } from '@/app/lib/definitions';

export default function Profile() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [statistics, setStatistics] = useState<StatisticsForUserApplications>();
  const [pendingApplications, setPendingApplications] = useState<PendingApplication[]>([]);
  const [completedApplications, setCompletedApplications] = useState<CompletedApplication[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const getProfile = async () => {
      await fetch('/api/profile', { method: "POST" })
        .then(async (res) => {
          const responseJson = await res.json();
          setUserDataFromApi(responseJson.userData);
          setStatisticsFromApi(responseJson.statistics);
          setPendingApplicationsFromApi(responseJson.pendingApplications);
          setIsLoading(false);
        })
    }
    getProfile();
  })

  function setUserDataFromApi(userRawData: User) {
    const userData: User = {
      id: userRawData.id,
      firstname: userRawData.firstname,
      surname: userRawData.surname,
      password: "",
      email: "",
      mailingConsent: userRawData.mailingConsent
    }
    setUser(userData);
  }

  function setStatisticsFromApi(statisticsRaw: StatisticsForUserApplications) {
    console.log(statisticsRaw);
    const statisticsForUser: StatisticsForUserApplications = {
      accepted: statisticsRaw.accepted,
      rejected: statisticsRaw.rejected,
      total: statisticsRaw.total,
      responseRate: ((statisticsRaw.accepted + statisticsRaw.rejected) / (statisticsRaw.total) * 100).toFixed(2)
    }
    setStatistics(statisticsForUser);
    console.log(statisticsForUser);
  }

  function setPendingApplicationsFromApi(pendingApplicationsRaw: PendingApplication[]) {
    console.log(pendingApplicationsRaw);
    for (let i = 0; i < pendingApplicationsRaw.length; i++) {
      const singleApplication = pendingApplicationsRaw[i].jobsTable;
      console.log(singleApplication);
      const application: PendingApplication = {
        id: singleApplication.id,
        title: singleApplication.title,
        description: singleApplication.description,
        byCompanyId: singleApplication.byCompanyId,
      }
      setPendingApplications([...pendingApplications, application]);
      console.log(pendingApplications);
    }
  }

  return (
    <div>
      {isLoading &&
        <SkeletonProfile />}
      <div className="flex flex-row w-[50svw]">
        <Image src="/profile/profile.png" alt="profile picture" width={350} height={350} />
        <span className="flex flex-col">
          <h2 className="text-xl font-semibold">User Information</h2>
          <span className="flex flex-col w-36">
            <span className="flex w-full justify-center gap-2">
              <span>{user?.firstname}</span>
              <span>{user?.surname}</span>
            </span>
          </span>
          <h2 className="mt-6 text-xl font-semibold">Statistics</h2>
          <table className="flex flex-row w-full border-1 border-neutral-800">
            <thead className="flex w-full">
              <tr className="flex flex-col w-full flex-shrink-0 text-left">
                <th className="border-2 border-neutral-800 p-1 font-normal">Applied To:</th>
                <th className="border-2 border-neutral-800 p-1 font-normal">Accepted:</th>
                <th className="border-2 border-neutral-800 p-1 font-normal">Rejected:</th>
                <th className="border-2 border-neutral-800 p-1 font-normal">Response Rate:</th>
              </tr>
            </thead>
            <tbody>
              <tr className="flex flex-col w-fit">
                <td className="flex justify-center border-2 border-neutral-800 p-1">{statistics?.appliedTo}</td>
                <td className="flex justify-center border-2 border-neutral-800 p-1">{statistics?.accepted}</td>
                <td className="flex justify-center border-2 border-neutral-800 p-1">{statistics?.rejected}</td>
                <td className="flex justify-center border-2 border-neutral-800 p-1">{statistics?.responseRate}%</td>
              </tr>
            </tbody>
          </table>
        </span>
      </div>
      <table className="border-2 border-neutral-800">
        <thead className="border-2 border-neutral-800">
          <tr >
            <th className="border-2 border-neutral-800 p-2">
              Company
            </th>
            <th className="border-2 border-neutral-800 p-2" >
              Job Title
            </th>
            <th className="border-2 border-neutral-800 p-2">
              Location
            </th>
            <th className="border-2 border-neutral-800 p-2">
              Salary Range
            </th>
            <th className="border-2 border-neutral-800 p-2">
              Status
            </th>
            <th className="border-2 border-neutral-800 p-2">
              Reasoning
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-2 border-neutral-800 p-2">
              Macrohard
            </td>
            <td className="border-2 border-neutral-800 p-2">
              Big Developer
            </td>
            <td className="border-2 border-neutral-800 p-2">
              New Jersey
            </td>
            <td className="border-2 border-neutral-800 p-2">
              15 000 - 17 000$
            </td>
            <td className="border-2 border-neutral-800 p-2">
              Rejected
            </td>
            <td className="border-2 border-neutral-800 p-2">
              We went with a better candidate, learn some js
            </td>
          </tr>
          {pendingApplications && pendingApplications.map((application) => {
            return (
              <tr key={application.id}>
                <td className="border-2 border-neutral-800 p-2">
                  {application.byCompanyId}
                </td>
                <td className="border-2 border-neutral-800 p-2">
                  {application.title}
                </td>
                <td className="border-2 border-neutral-800 p-2">
                  {application.city || "NaN"}
                </td>
                <td className="border-2 border-neutral-800 p-2">
                  {application.salary || "NaN"}
                </td>
                <td className="border-2 border-neutral-800 p-2">
                  Pending
                </td>
                <td className="border-2 border-neutral-800 p-2">
                </td>
              </tr>
            )
          })}
          {completedApplications && completedApplications.map((application) => {
            return (
              <tr key={application.id}>
                <td className="border-2 border-neutral-800 p-2">
                  {application.company}
                </td>
                <td className="border-2 border-neutral-800 p-2">
                  {application.title}
                </td>
                <td className="border-2 border-neutral-800 p-2">
                  {application.city || "NaN"}
                </td>
                <td className="border-2 border-neutral-800 p-2">
                  {application.salary || "NaN"}
                </td>
                <td className="border-2 border-neutral-800 p-2">
                  {application.status}
                </td>
                <td className="border-2 border-neutral-800 p-2">
                  {application.rejectionReason}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

