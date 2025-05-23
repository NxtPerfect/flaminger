"use client";
import React from 'react'
import SkeletonProfile from '@/components/placeholders/SkeletonProfile';
import { ROLE_VARIANTS, ROLES } from '@/app/lib/definitions';
import JobApplicationsForUserProfile from '@/components/organisms/JobApplicationsForUserProfile';
import UserLanguages from '@/components/organisms/UserLanguages';
import UserTechnologies from '@/components/organisms/UserTechnologies';
import StatisticsUserPieChart from '@/components/organisms/StatisticsUserPieChart';
import LinkButton from '@/components/organisms/LinkButton';
import ProfilePicture from '@/components/atoms/ProfilePicture';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useEmployerProfile } from '@/hooks/useEmployerProfile';
import AcceptanceRatePercentage from '@/components/atoms/AcceptanceRatePercentage';
import Table from '@/components/atoms/Table';
import TableHead from '@/components/atoms/TableHead';
import TableRow from '@/components/atoms/TableRow';
import TableHeading from '@/components/atoms/TableHeading';
import TableBody from '@/components/atoms/TableBody';
import TableColumn from '@/components/atoms/TableColumn';

export default function Profile() {
  const {
    isLoading: isUserLoading,
    user,
    statistics,
    pendingApplications,
    completedApplications,
    languages,
    technologies
  } = useUserProfile();
  const {
    isLoading: isEmployerLoading,
    name,
    activeJobOffersPosted,
    applicationsReceivedAmount,
    acceptanceRate
  } = useEmployerProfile();
  const { role } = useAuth();

  return (
    <div>
      {(isUserLoading || isEmployerLoading) &&
        <SkeletonProfile />}
      <div className={`flex flex-col rounded-2xl bg-neutral-800/60 p-4
            text-white items-center`}>
        {!isUserLoading && role === ROLES[ROLE_VARIANTS.user] &&
          <>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 justify-items-center items-center w-[80svw] md:w-[50svw] p-4">
              <ProfilePicture className="" />
              <div className="self-end justify-self-end">
                <LinkButton variant="profile" className="text-nowrap p-4 md:p-4" href="/profile/edit">
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
                <h2 className="text-center md:text-left mt-6 text-xl font-semibold text-white">Statistics</h2>
                <StatisticsUserPieChart statistics={statistics} />
              </div>
            </div>
            <JobApplicationsForUserProfile pendingApplications={pendingApplications} completedApplications={completedApplications} />
          </>
        }
        {!isEmployerLoading && role === ROLES[ROLE_VARIANTS.employer] &&
          <>
            <h2 className="text-2xl font-bold tracking-wide">
              {name}
            </h2>
            <div>
              <AcceptanceRatePercentage
                acceptanceRate={Number.parseFloat(acceptanceRate)} />
            </div>
            <div className="mt-4 flex flex-col">
              <span className="text-lg">
                Amount of applications received
              </span>
              <div className="flex flex-row gap-2 justify-center">
                <span>
                  new: {applicationsReceivedAmount.new}
                </span>
                <span>
                  total: {applicationsReceivedAmount.total}
                </span>
              </div>
            </div>
            <h3 className="mt-8 text-xl">
              Job offers posted:
            </h3>
            <Table className="mt-2">
              <TableHead className="w-full">
                <TableRow className="w-full">
                  <TableHeading className="w-1/2 font-lg">
                    Job title
                  </TableHeading>
                  <TableHeading className="w-1/2 font-lg">
                    Description
                  </TableHeading>
                </TableRow>
              </TableHead>
              <TableBody>
                {activeJobOffersPosted && activeJobOffersPosted.map((job, index) => {
                  return (
                    <TableRow key={index}>
                      <TableColumn className="w-1/2">
                        {job.title}
                      </TableColumn>
                      <TableColumn className="w-1/2">
                        <span className="max-w-[80ch] line-clamp-3 overflow-hidden text-ellipsis text-pretty">
                          {job.description.slice(0, 180)}
                        </span>
                      </TableColumn>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </>}
      </div>
    </div>
  )
}

