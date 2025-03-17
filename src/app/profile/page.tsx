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

export default function Profile() {
  const {
    isLoading,
    user,
    statistics,
    pendingApplications,
    completedApplications,
    languages,
    technologies
  } = useUserProfile();
  const { role } = useAuth();

  return (
    <div>
      {isLoading &&
        <SkeletonProfile />}
      <div className="flex flex-col rounded-2xl bg-neutral-800/60 p-4
            text-white items-center">
        {role === ROLES[ROLE_VARIANTS.user] &&
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
      </div>
      <div>
        Not a user
      </div>
    </div>
  )
}

