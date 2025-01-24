import React from 'react'

type Props = {
  readonly type: "normal" | "big" | "alt" | "alt-big" | "formSubmit"
  readonly children: string
  readonly isLoading?: boolean
}

export default function ActionButton({ type = "normal", children = "Test", isLoading = false }: Props) {
  let button;
  switch (type) {
    case "big":
      button = <button className="flex mt-8 bg-orange-600 hover:bg-red-600 hover:animate-none text-white rounded-md p-8 py-2 text-[2rem] leading-tight animate-pulse duration-500" disabled={isLoading}>{children}</button>
      break;
    case "alt":
      button = <button className="flex mt-8 text-orange-600 bg-neutral-900 rounded-md p-8 py-2 text-[2rem] leading-tight animate-pulse hover:bg-neutral-800 hover:animate-none hover:ease-in-out duration-500" disabled={isLoading}>{children}</button>
      break;
    case "formSubmit":
      button = <button type="submit" className="mt-2 bg-orange-600 text-white rounded-md px-4 py-2 text-[1rem] leading-tight hover:bg-red-600 hover:ease-in-out duration-500" disabled={isLoading}>{children}</button>
      break;
    default:
      button = <button className="mt-2 bg-orange-600 text-white rounded-md px-4 py-2 text-[1rem] leading-tight animate-pulse hover:bg-red-600 hover:ease-in-out duration-500" disabled={isLoading}>{children}</button>
      break;
  }
  return button;
}

