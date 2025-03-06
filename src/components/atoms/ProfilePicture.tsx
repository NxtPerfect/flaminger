import Image from 'next/image'
import React from 'react'

export default function ProfilePicture() {
  return (
    <div className="overflow-hidden rounded-full border-4 border-orange-600 dark:border-orange-600/60 bg-neutral-600">
      <Image src="/profile/profile.png" alt="profile picture" width={250} height={250} />
    </div>
  )
}

