import React from 'react'

export default function SkeletonJobOffer() {
  return (
    <div className="flex flex-col bg-neutral-900 rounded-md p-4 px-8 w-[75svw] md:w-[55svw] min-h-36 animate-pulse">
      <div className="flex flex-row gap-2">
        <div className="min-w-full min-h-6 bg-neutral-700"></div>
      </div>
      <div className="mt-4 flex flex-row gap-2">
        <div className="min-w-32 min-h-6 bg-neutral-700"></div>
      </div>
      <div className="mt-4 h-[3lh] text-ellipsis bg-neutral-700"></div>
      <div className="mt-4 h-[3lh] text-ellipsis bg-neutral-700"></div>
      <div className="mt-4 flex flex-row items-center justify-between">
        <div className="flex flex-row gap-2 align-middle items-center">
          <div className="min-w-32 min-h-8 bg-neutral-700 rounded-md px-1 self-center">
          </div>
          <div className="min-w-16 min-h-8 bg-neutral-700 rounded-md px-1 self-center">
          </div>
          <div className="min-w-24 min-h-8 bg-neutral-700 rounded-md px-1 self-center">
          </div>
        </div>
        <div className="flex flex-row gap-8">
          <div className="min-w-48 min-h-8 bg-neutral-700"></div>
        </div>
      </div>
    </div>
  )
}

