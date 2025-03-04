import React from 'react'
import PlusInCircleSvg from '../atoms/PlusInCircleSvg'

type Props = {
  className?: string
  children: React.ReactNode
  onClick: () => void
}

export default function AddItemButton({ className, children, onClick }: Props) {
  const style = `flex flex-row gap-1 items-center w-fit py-1 px-2 rounded-md text-orange-600 hover:text-orange-600/80 cursor-pointer duration-75 transition ${className}`.trim();
  return (
    <button type="button" className={style} onClick={onClick}>
      <PlusInCircleSvg className='size-5' imageAlt="Add new item" />
      {children}
    </button>
  )
}

