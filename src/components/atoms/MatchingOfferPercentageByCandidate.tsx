import React from 'react'

type Props = {
  matching: string
}

export default function MatchingOfferPercentageByCandidate({ matching }: Props) {
  const parsedMatching = Number.parseFloat(matching);
  const color = parsedMatching > 75 ? `text-green-600` : parsedMatching > 25 ? `text-orange-600` : `text-red-600`
  const combinedClass = `font-mono text-2xl px-2 bg-black/80 ${color}`.trim();
  return (
    <p className="flex text-lg gap-2 text-black dark:text-white">
      It&apos;s a match in
      <span className={combinedClass}>
        {matching}%
      </span>
    </p>
  )
}

