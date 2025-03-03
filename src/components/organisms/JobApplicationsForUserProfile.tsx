import { CompletedApplication, Offer } from '@/app/lib/definitions';
import React from 'react'
import Table from '../atoms/Table';
import TableHead from '../atoms/TableHead';
import TableRow from '../atoms/TableRow';
import TableBody from '../atoms/TableBody';

type Props = {
  pendingApplications: Partial<Offer>[];
  completedApplications: CompletedApplication[];
}

export default function JobApplicationsForUserProfile({ pendingApplications, completedApplications }: Props) {
  return (
    <Table className="w-full">
      <TableHead>
        <TableRow className="w-full">
          <th className="border-2 border-neutral-300 dark:border-neutral-800 p-2 w-1/6">
            Company
          </th>
          <th className="border-2 border-neutral-300 dark:border-neutral-800 p-2 w-1/6" >
            Job Title
          </th>
          <th className="border-2 border-neutral-300 dark:border-neutral-800 p-2 w-1/6">
            Location
          </th>
          <th className="border-2 border-neutral-300 dark:border-neutral-800 p-2 w-1/6">
            Salary Range
          </th>
          <th className="border-2 border-neutral-300 dark:border-neutral-800 p-2 w-1/6">
            Status
          </th>
          <th className="border-2 border-neutral-300 dark:border-neutral-800 p-2 w-1/6">
            Reasoning
          </th>
        </TableRow>
      </TableHead>
      <TableBody className="w-full">
        {pendingApplications && pendingApplications.map((application: Partial<Offer>) => {
          return (
            <TableRow className="w-full" key={application.id}>
              <td className="border-2 border-neutral-300 dark:border-neutral-800 p-2 w-1/6">
                {application.company ?? "None"}
              </td>
              <td className="border-2 border-neutral-300 dark:border-neutral-800 p-2 w-1/6">
                {application.title ?? "Error"}
              </td>
              <td className="border-2 border-neutral-300 dark:border-neutral-800 p-2 w-1/6">
                {
                  "NaN" //application.city ?? "NaN"
                }
              </td>
              <td className="border-2 border-neutral-300 dark:border-neutral-800 p-2 w-1/6">
                {
                  "NaN" //application.salary ?? "NaN"
                }
              </td>
              <td className="border-2 border-neutral-300 dark:border-neutral-800 p-2 w-1/6">
                Pending
              </td>
              <td className="border-2 border-neutral-300 dark:border-neutral-800 p-2 w-1/6">
                -
              </td>
            </TableRow>
          )
        })}
        {completedApplications && completedApplications.map((application: CompletedApplication) => {
          return (
            <TableRow className="w-full" key={application.id}>
              <td className="border-2 border-neutral-300 dark:border-neutral-800 p-2 w-1/6">
                {application.company}
              </td>
              <td className="border-2 border-neutral-300 dark:border-neutral-800 p-2 w-1/6">
                {application.title}
              </td>
              <td className="border-2 border-neutral-300 dark:border-neutral-800 p-2 w-1/6">
                {
                  "NaN" // application.city ?? "NaN"}
                }
              </td>
              <td className="border-2 border-neutral-300 dark:border-neutral-800 p-2 w-1/6">
                {
                  "NaN" // application.salary ?? "NaN"}
                }
              </td>
              <td className={`border-2 border-neutral-300 dark:border-neutral-800 p-2 ${application.isAccepted ? "text-green-500" : "text-red-500"} w-1/6`}>
                {application.isAccepted ? "Accepted" : "Rejected"}
              </td>
              <td className="border-2 border-neutral-300 dark:border-neutral-800 p-2 w-1/6">
                {application.rejectionReason ?? "Not specified"}
              </td>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

