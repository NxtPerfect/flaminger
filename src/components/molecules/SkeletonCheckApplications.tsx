import React from 'react'

export default function SkeletonCheckApplications() {
  return (
    <div className="w-full bg-neutral-200 dark:bg-neutral-800 p-8
      rounded-md animate-pulse flex flex-col gap-4">
      <div className="grid grid-cols-2 dark:text-white bg-neutral-400
      dark:bg-neutral-800 p-8 mt-8 justify-items-center items-stretch">
        <div>
          <div className="w-fit">
            <div className="w-48 aspect-square bg-neutral-800"></div>
          </div>
          <div className="mt-8 flex flex-col w-full items-start justify-self-center gap-2">
            <span className="text-2xl font-semibold w-full gap-2">
              <div className="w-[20ch] bg-neutral-600 h-[1lh]"></div>
            </span>
            <span>
              <div className="w-[20ch] bg-neutral-600 h-[1lh]"></div>
            </span>
          </div>
        </div>
        <div className="self-end">
          <div className="flex flex-col gap-2">
            <div className="w-[10ch] bg-neutral-600 h-[1lh]"></div>
            <div className="flex flex-row gap-2 flex-wrap">
              <div className="w-[12ch] bg-neutral-600 h-[1.25lh] rounded-md"></div>
              <div className="w-[12ch] bg-neutral-600 h-[1.25lh] rounded-md"></div>
              <div className="w-[12ch] bg-neutral-600 h-[1.25lh] rounded-md"></div>
              <div className="w-[12ch] bg-neutral-600 h-[1.25lh] rounded-md"></div>
              <div className="w-[12ch] bg-neutral-600 h-[1.25lh] rounded-md"></div>
              <div className="w-[12ch] bg-neutral-600 h-[1.25lh] rounded-md"></div>
              <div className="w-[12ch] bg-neutral-600 h-[1.25lh] rounded-md"></div>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="w-[10ch] bg-neutral-600 h-[1lh]"></div>
            <div className="flex flex-row gap-2 flex-wrap">
              <div className="w-[12ch] bg-neutral-600 h-[1.25lh] rounded-md"></div>
              <div className="w-[12ch] bg-neutral-600 h-[1.25lh] rounded-md"></div>
              <div className="w-[12ch] bg-neutral-600 h-[1.25lh] rounded-md"></div>
              <div className="w-[12ch] bg-neutral-600 h-[1.25lh] rounded-md"></div>
              <div className="w-[12ch] bg-neutral-600 h-[1.25lh] rounded-md"></div>
              <div className="w-[12ch] bg-neutral-600 h-[1.25lh] rounded-md"></div>
              <div className="w-[12ch] bg-neutral-600 h-[1.25lh] rounded-md"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[30ch] bg-neutral-400 h-[1lh] self-center"></div>

      <div className="grid grid-cols-2 dark:text-white bg-neutral-400
      dark:bg-neutral-800 p-8 mt-8 justify-items-center items-stretch">
        <div>
          <div className="mt-8 flex flex-col w-full items-start justify-self-center gap-2">
            <span className="text-2xl font-semibold w-full gap-2">
              <div className="w-[20ch] bg-neutral-600 h-[1lh]"></div>
            </span>
            <span>
              <div className="w-[80ch] bg-neutral-600 h-[8lh]"></div>
            </span>
          </div>
        </div>
        <div className="self-end">
          <div className="flex flex-col gap-2">
            <div className="w-[10ch] bg-neutral-600 h-[1lh]"></div>
            <div className="flex flex-row gap-2 flex-wrap">
              <div className="w-[12ch] bg-neutral-600 h-[1.25lh] rounded-md"></div>
              <div className="w-[12ch] bg-neutral-600 h-[1.25lh] rounded-md"></div>
              <div className="w-[12ch] bg-neutral-600 h-[1.25lh] rounded-md"></div>
              <div className="w-[12ch] bg-neutral-600 h-[1.25lh] rounded-md"></div>
              <div className="w-[12ch] bg-neutral-600 h-[1.25lh] rounded-md"></div>
              <div className="w-[12ch] bg-neutral-600 h-[1.25lh] rounded-md"></div>
              <div className="w-[12ch] bg-neutral-600 h-[1.25lh] rounded-md"></div>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="w-[10ch] bg-neutral-600 h-[1lh]"></div>
            <div className="flex flex-row gap-2 flex-wrap">
              <div className="w-[12ch] bg-neutral-600 h-[1.25lh] rounded-md"></div>
              <div className="w-[12ch] bg-neutral-600 h-[1.25lh] rounded-md"></div>
              <div className="w-[12ch] bg-neutral-600 h-[1.25lh] rounded-md"></div>
              <div className="w-[12ch] bg-neutral-600 h-[1.25lh] rounded-md"></div>
              <div className="w-[12ch] bg-neutral-600 h-[1.25lh] rounded-md"></div>
              <div className="w-[12ch] bg-neutral-600 h-[1.25lh] rounded-md"></div>
              <div className="w-[12ch] bg-neutral-600 h-[1.25lh] rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center w-full gap-4">
        <div className="w-[10ch] bg-neutral-400 h-[2lh]"></div>
        <div className="w-[10ch] bg-neutral-400 h-[2lh]"></div>
        <div className="w-[40ch] bg-neutral-400 h-[4lh]"></div>
      </div>
    </div>
  )
}

