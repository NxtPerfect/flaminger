import Image from 'next/image'
import React from 'react'

type Props = {
  imagePath: string
  children: React.ReactNode
  reversed?: boolean
}

export default function HeroSection({ imagePath, children, reversed }: Props) {
  if (reversed) {
    return (
    <div className="grid grid-cols-2 gap-4 p-8 rounded-md w-4/6 min-h-96 bg-neutral-600 dark:bg-neutral-800 text-white justify-start items-center ">
      <div className="flex flex-col">
        {children}
      </div>
      <Image src={imagePath} alt="hero section image" width={600} height={600} />
    </div>
    )
  }
  return (
    <div className="grid grid-cols-2 gap-4 p-8 rounded-md w-4/6 min-h-96 bg-neutral-600 dark:bg-neutral-800 text-white justify-start items-center ">
      <Image src={imagePath} alt="hero section image" width={600} height={600} />
      <div className="flex flex-col">
        {children}
      </div>
    </div>
  )
}

