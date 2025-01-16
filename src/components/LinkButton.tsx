import Link from 'next/link'
import React from 'react'

type Props = {
  type: "header" | "offerLink" | "alt" | null
  href: string
  children: string
}

export const LinkButton = ({ type, href, children }: Props) => {
  let link;
  switch (type) {
    case "offerLink":
      link = <Link href={href} className="bg-orange-600 hover:bg-orange-700 ease-in-out duration-100 rounded-md px-2 py-1">
        {children}
      </Link>
      break;
    case "alt":
      link = <Link href={href} className="underline hover:text-neutral-600 hover:decoration-orange-800 ease-in-out duration-100 decoration-orange-500 underline-offset-8 rounded-md px-2 py-1">
        {children}
      </Link>
      break;

    default:
      link = <Link href={href} className="hover:underline ease-in-out duration-100 decoration-orange-500 underline-offset-8 rounded-md px-2 py-1">
        {children}
      </Link>
      break;
  }
  return link;
}
