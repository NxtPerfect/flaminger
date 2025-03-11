import React from 'react'

export default function Spinner() {
  return (
    <div className={`w-full h-2 border-2 border-neutral-600
      rounded-full overflow-clip`}>
      <div className={`h-full w-16 aspect-square bg-orange-600
        rounded-full motion-safe:animate-left-right`}>
      </div>
    </div>
  )
}

