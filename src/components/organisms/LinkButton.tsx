"use client";
import { AuthContext } from '@/providers/AuthProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

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
  PROFILE: "profile",
  FOOTER: "footer",
  BIG: "big"
}

const BUTTON_STYLES = {
  [BUTTON_VARIANTS.BIG]:
    `flex mt-8 bg-orange-600 hover:bg-red-600 hover:animate-none
text-white rounded-md p-8 py-2 text-[2rem] leading-tight duration-75
focus:border-2 border-blue-500`,
  [BUTTON_VARIANTS.OFFER_LINK]:
    `bg-orange-700 hover:bg-orange-600 text-white ease-in-out
duration-100 rounded-md px-2 py-1`,
  [BUTTON_VARIANTS.ALT]:
    `underline hover:text-neutral-400 hover:decoration-orange-800
ease-in-out duration-100 decoration-orange-500 underline-offset-8
rounded-md px-2 py-1`,
  [BUTTON_VARIANTS.HEADER]:
    `text-white hover:underline ease-in-out duration-100
decoration-orange-500 underline-offset-8 rounded-md px-2 py-1`,
  [BUTTON_VARIANTS.LOGOUT]:
    `hover:underline ease-in-out duration-100 decoration-orange-500
underline-offset-8 rounded-md px-2 py-1`,
  [BUTTON_VARIANTS.PROFILE]:
    `mt-2 bg-orange-600 text-white rounded-md px-4 py-2 text-2xl
md:text-[1rem] leading-tight hover:bg-red-600 hover:ease-in-out duration-75`,
  [BUTTON_VARIANTS.FOOTER]:
    `mt-2 text-blue-400 underline px-4 py-2 text-[1rem] leading-tight
hover:text-blue-600/80 hover:ease-in-out duration-75`,
  default:
    `hover:underline ease-in-out duration-100 decoration-orange-500
underline-offset-8 rounded-md px-2 py-1`
}

type ButtonVariant = typeof BUTTON_VARIANTS[keyof typeof BUTTON_VARIANTS]

export default function LinkButton({ variant, href, className, children }: Props) {
  const router = useRouter();
  const auth = useContext(AuthContext);

  async function handleLogout() {
    await auth?.logout()
      .then(() => {
        router.push('/');
        router.refresh();
      })
  }

  const buttonStyle = variant ? BUTTON_STYLES[variant] : BUTTON_STYLES.default;
  const combinedStyle = (`${buttonStyle ?? ""} ${className ?? ""}`).trim();
  const isLogout = variant === "logout" ? true : false;

  if (!isLogout)
    return <Link href={href} className={`${combinedStyle}`}>{children}</Link>

  return <button
    onClick={handleLogout}
    className="hover:underline ease-in-out duration-100 decoration-orange-500 underline-offset-8 rounded-md px-2 py-1 text-white">
    {children}
  </button>
}
