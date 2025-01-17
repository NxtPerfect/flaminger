import React from 'react'
import Image from 'next/image'

export default function Profile() {
  return (
    <div>
      <Image src="/profile/profile.png" alt="profile picture" width={250} height={250} />
      <span className="flex flex-col">
        <pre>
          Name
          Surname
          Date of Birth
        </pre>
        <pre>
          Applied to
          Accepted
          Rejected
          Response Rate
        </pre>
        <table className="border-2 border-neutral-800">
          <thead className="border-2 border-neutral-800">
            <tr >
              <th className="border-2 border-neutral-800">
                Company
              </th>
              <th className="border-2 border-neutral-800" >
                Job Title
              </th>
              <th className="border-2 border-neutral-800">
                Location
              </th>
              <th className="border-2 border-neutral-800">
                Salary Range
              </th>
              <th className="border-2 border-neutral-800">
                Status
              </th>
              <th className="border-2 border-neutral-800">
                Reasoning
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-2 border-neutral-800">
                Macrohard
              </td>
              <td className="border-2 border-neutral-800">
                Big Developer
              </td>
              <td className="border-2 border-neutral-800">
                New Jersey
              </td>
              <td className="border-2 border-neutral-800">
                15 000 - 17 000$
              </td>
              <td className="border-2 border-neutral-800">
                Rejected
              </td>
              <td className="border-2 border-neutral-800">
                We went with a better candidate, learn some js
              </td>
            </tr>
          </tbody>
        </table>
      </span>
    </div>
  )
}

