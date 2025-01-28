import React from 'react'
import Image from 'next/image'

export default function Profile() {
  const appliedTo = 3;
  const accepted = 1;
  const rejected = 1;
  const responseRate = (2 / 3) * 100;

  const firstname = "Joello";
  const surname = "Doenetello";
  const dateOfBirth = "01.01.1970";
  return (
    <>
      <div className="flex flex-row w-[50svw]">
        <Image src="/profile/profile.png" alt="profile picture" width={350} height={350} />
        <span className="flex flex-col">
          <h2 className="text-xl font-semibold">User Information</h2>
          <span className="flex flex-col w-36">
            <span className="flex w-full justify-center gap-2">
              <span>{firstname}</span>
              <span>{surname}</span>
            </span>
            <span className="flex w-full justify-center">
              <span>{dateOfBirth}</span>
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
                <td className="flex justify-center border-2 border-neutral-800 p-1">{appliedTo}</td>
                <td className="flex justify-center border-2 border-neutral-800 p-1">{accepted}</td>
                <td className="flex justify-center border-2 border-neutral-800 p-1">{rejected}</td>
                <td className="flex justify-center border-2 border-neutral-800 p-1">{responseRate.toFixed(2)}%</td>
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
        </tbody>
      </table>
    </>
  )
}

