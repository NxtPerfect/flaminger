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
  const tableStyle = "w-full";
  const rowStyle = "w-full";
  const columnStyle = "border-2 border-neutral-300 dark:border-neutral-800 p-2 w-1/4";
  return (
    <Table className={tableStyle}>
      <TableHead>
        <TableRow className={rowStyle}>
          <th className={columnStyle}>
            Company
          </th>
          <th className={columnStyle} >
            Job Title
          </th>
          <th className={columnStyle}>
            Status
          </th>
          <th className={columnStyle}>
            Reason
          </th>
        </TableRow>
      </TableHead>
      <TableBody className={rowStyle}>
        {pendingApplications && pendingApplications.map((application: Partial<Offer>) => {
          return (
            <TableRow className={rowStyle} key={application.id}>
              <td className={columnStyle}>
                {application.company ?? "None"}
              </td>
              <td className={columnStyle}>
                {application.title ?? "Error"}
              </td>
              <td className={columnStyle}>
                Pending
              </td>
              <td className={columnStyle}>
                -
              </td>
            </TableRow>
          )
        })}
        {completedApplications && completedApplications.map((application: CompletedApplication) => {
          return (
            <TableRow className={rowStyle} key={application.id}>
              <td className={columnStyle}>
                {application.company}
              </td>
              <td className={columnStyle}>
                {application.title}
              </td>
              <td className={`${columnStyle} ${application.isAccepted ? "text-green-500" : "text-red-500"}`}>
                {application.isAccepted ? "Accepted" : "Rejected"}
              </td>
              <td className={columnStyle}>
                {application.rejectionReason ?? "Not specified"}
              </td>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

