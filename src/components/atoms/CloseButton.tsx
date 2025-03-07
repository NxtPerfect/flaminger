import React from 'react'

type Props = {
  onClick: () => void
}

export default function CloseButton({ onClick }: Props) {
  return (
    <div className="flex justify-center items-center cursor-pointer p-2 hover:text-white/80
      hover:dark:text-black/80 bg-red-600 hover:bg-red-600/80 aspect-square w-8 h-8 rounded-md"
      onClick={onClick}>
      <span>
        X
      </span>
    </div>
  )
}

