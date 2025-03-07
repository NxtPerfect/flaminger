import Image from 'next/image'
import React from 'react'

type Props = {
  width?: number
  height?: number
  className?: string
}

export default function ProfilePicture({ width = 250, height = 250, className }: Props) {
  const combinedClassName = `overflow-hidden rounded-full border-4
border-orange-600 dark:border-orange-600/60 bg-neutral-600 ${className}`.trim();
  return (
    <div className={combinedClassName}>
      <Image src="/profile/profile.png" alt="profile picture" width={width} height={height} />
    </div>
  )
}

