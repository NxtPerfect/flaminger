import Image from 'next/image'
import React from 'react'

type Props = {
  width?: number
  height?: number
}

export default function ProfilePicture({ width = 250, height = 250 }: Props) {
  return (
    <div className="overflow-hidden rounded-full border-4 border-orange-600 dark:border-orange-600/60 bg-neutral-600">
      <Image src="/profile/profile.png" alt="profile picture" width={width} height={height} />
    </div>
  )
}

