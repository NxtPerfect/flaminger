import React from 'react'

export default function SkeletonProfile() {
  return (
    <span className="animate-pulse z-[-1]">
      <div className="flex flex-row w-[50svw]">
        <div className="w-[20rem] h-[20rem] bg-neutral-700 m-4" />
        <span className="flex flex-col">
          <h2 className="w-[20ch] h-[1.25lh] bg-neutral-700"></h2>
          <span className="flex flex-col w-36">
            <span className="flex w-full justify-center gap-2">
              <span className="mt-1 h-[1lh] w-[10ch] bg-neutral-700"></span>
              <span className="mt-1 h-[1lh] w-[18ch] bg-neutral-700"></span>
            </span>
            <span className="flex w-full justify-center">
              <span className="mt-1 h-[1lh] w-[12ch] bg-neutral-700"></span>
            </span>
          </span>
          <h2 className="mt-6 text-xl w-[14ch] h-[1lh] bg-neutral-700"></h2>
          <table className="mt-1 flex flex-row h-[6lh] w-[22ch] bg-neutral-700">
          </table>
        </span>
      </div>
      <table className="bg-neutral-700 w-[110ch] h-[3lh]">
      </table>
    </span>
  )
  // <div className="flex flex-col bg-neutral-900 rounded-md p-4 px-8 min-w-[35svw] min-h-36 animate-pulse">
}

