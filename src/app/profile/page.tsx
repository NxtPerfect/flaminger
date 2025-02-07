"use client";
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import SkeletonProfile from '@/components/placeholders/SkeletonProfile';
import { CompletedApplication, DatabaseCompletedApplication, Offer, PendingApplication, StatisticsForUserApplications, StatisticsForUserApplicationsFromDatabase, User } from '@/app/lib/definitions';
import StatisticsUserTable from '@/components/organisms/StatisticsUserTable';
import Table from '@/components/atoms/Table';
import TableHead from '@/components/atoms/TableHead';
import TableRow from '@/components/atoms/TableRow';
import TableBody from '@/components/atoms/TableBody';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getProfile()
  }, [getProfile]);

  function setUserDataFromApi(userRawData: User) {
    console.log(userRawData);
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
      setPendingApplications([...pendingApplications, application]);
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
      }
      setCompletedApplications([...completedApplications, application]);
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
          <Table className="w-full">
            <TableHead>
              <TableRow className="w-full">
                <th className="border-2 border-neutral-800 p-2 w-1/6">
                  Company
                </th>
                <th className="border-2 border-neutral-800 p-2 w-1/6" >
                  Job Title
                </th>
                <th className="border-2 border-neutral-800 p-2 w-1/6">
                  Location
                </th>
                <th className="border-2 border-neutral-800 p-2 w-1/6">
                  Salary Range
                </th>
                <th className="border-2 border-neutral-800 p-2 w-1/6">
                  Status
                </th>
                <th className="border-2 border-neutral-800 p-2 w-1/6">
                  Reasoning
                </th>
              </TableRow>
            </TableHead>
            <TableBody className="w-full">
              {pendingApplications && pendingApplications.map((application) => {
                return (
                  <TableRow className="w-full" key={application.id}>
                    <td className="border-2 border-neutral-800 p-2 w-1/6">
                      {application.company ?? "None"}
                    </td>
                    <td className="border-2 border-neutral-800 p-2 w-1/6">
                      {application.title ?? "Error"}
                    </td>
                    <td className="border-2 border-neutral-800 p-2 w-1/6">
                      {
                        "NaN" //application.city ?? "NaN"
                      }
                    </td>
                    <td className="border-2 border-neutral-800 p-2 w-1/6">
                      {
                        "NaN" //application.salary ?? "NaN"
                      }
                    </td>
                    <td className="border-2 border-neutral-800 p-2 w-1/6">
                      Pending
                    </td>
                    <td className="border-2 border-neutral-800 p-2 w-1/6">
                      -
                    </td>
                  </TableRow>
                )
              })}
              {completedApplications && completedApplications.map((application) => {
                return (
                  <TableRow className="w-full" key={application.id}>
                    <td className="border-2 border-neutral-800 p-2 w-1/6">
                      {application.company}
                    </td>
                    <td className="border-2 border-neutral-800 p-2 w-1/6">
                      {application.title}
                    </td>
                    <td className="border-2 border-neutral-800 p-2 w-1/6">
                      {
                        "NaN" // application.city ?? "NaN"}
                      }
                    </td>
                    <td className="border-2 border-neutral-800 p-2 w-1/6">
                      {
                        "NaN" // application.salary ?? "NaN"}
                      }
                    </td>
                    <td className={`border-2 border-neutral-800 p-2 ${application.isAccepted ? "text-green-500" : "text-red-500"} w-1/6`}>
                      {application.isAccepted ? "Accepted" : "Rejected"}
                    </td>
                    <td className="border-2 border-neutral-800 p-2 w-1/6">
                      {application.rejectionReason ?? "Not specified"}
                    </td>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </>
        )
      }
    </div>
  )
}

