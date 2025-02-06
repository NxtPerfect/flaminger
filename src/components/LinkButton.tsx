"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  readonly variant?: ButtonVariant | null
  readonly href: string
  readonly className?: string | null
  readonly children?: React.ReactNode | null
}

const BUTTON_VARIANTS = {
  OFFER_LINK: "offerLink",
  ALT: "alt",
  HEADER: "header",
  LOGOUT: "logout",
}

const BUTTON_STYLES = {
  [BUTTON_VARIANTS.OFFER_LINK]:
    "bg-orange-700 hover:bg-orange-600 text-white ease-in-out duration-100 rounded-md px-2 py-1",
  [BUTTON_VARIANTS.ALT]:
    "underline hover:text-neutral-400 hover:decoration-orange-800 ease-in-out duration-100 decoration-orange-500 underline-offset-8 rounded-md px-2 py-1",
  [BUTTON_VARIANTS.HEADER]:
    "hover:underline ease-in-out duration-100 decoration-orange-500 underline-offset-8 rounded-md px-2 py-1",
  [BUTTON_VARIANTS.LOGOUT]:
    "hover:underline ease-in-out duration-100 decoration-orange-500 underline-offset-8 rounded-md px-2 py-1",
  default:
    "hover:underline ease-in-out duration-100 decoration-orange-500 underline-offset-8 rounded-md px-2 py-1"
}

type ButtonVariant = typeof BUTTON_VARIANTS[keyof typeof BUTTON_VARIANTS]

export default function LinkButton({ variant, href, className, children }: Props) {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/logout', { method: "DELETE" })
      .then(() => {
        router.push('/');
        router.refresh();
      })
  }

  const buttonStyle = variant ? BUTTON_STYLES[variant] : BUTTON_STYLES.default;
  const combinedStyle = (`${buttonStyle} ${className}`).trim();
  const isLogout = variant === "logout" ? true : false;

  if (!isLogout)
    return <Link href={href} className={`${combinedStyle}`}>{children}</Link>

  return <button onClick={handleLogout} className="hover:underline ease-in-out duration-100 decoration-orange-500 underline-offset-8 rounded-md px-2 py-1">{children}</button>
}
