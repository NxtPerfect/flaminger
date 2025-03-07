import React from 'react'

type Props = {
  acceptanceRate?: number
}

export default function AcceptanceRatePercentage({ acceptanceRate }: Props) {
  return (
    <span className={(acceptanceRate ?? 0) > 50 ? "text-green-500" : "text-red-500"}>
      {acceptanceRate ?? 0}%
    </span>
  )
}

