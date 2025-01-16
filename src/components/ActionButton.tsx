import React from 'react'

type Props = {
  type: "normal" | "big" | "alt" | "alt-big"
  children: string
}

export default function ActionButton({ type, children }: Props) {
  let button;
  switch (type) {
    case "big":
      button = <button className="flex mt-8 bg-orange-600 text-white rounded-md p-8 py-2 text-[2rem] leading-tight animate-pulse hover:bg-red-600 hover:ease-in-out duration-500">{children}</button>
      break;
    case "alt":
      button = <button className="flex mt-8 text-orange-600 bg-neutral-900 rounded-md p-8 py-2 text-[2rem] leading-tight animate-pulse hover:bg-neutral-800 hover:ease-in-out duration-500">{children}</button>
      break;
    default:
      button = <button className="mt-2 bg-orange-600 text-white rounded-md px-4 py-2 text-[1rem] leading-tight animate-pulse hover:bg-red-600 hover:ease-in-out duration-500">{children}</button>
      break;
  }
  return button;
}

