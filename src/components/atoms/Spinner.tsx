import React from 'react'

export default function Spinner() {
  return (
    <div className="w-full h-6 border-2 border-neutral-600 rounded-full overflow-hidden">
      <div className="h-full aspect-square bg-orange-600 rounded-[100%] motion-safe:animate-left-right">
      </div>
    </div>
  )
}

