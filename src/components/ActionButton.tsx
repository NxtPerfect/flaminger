import React, { MouseEventHandler } from 'react'
import Spinner from './atoms/Spinner'

interface Props {
  readonly variant?: ButtonVariant | null
  readonly children?: React.ReactNode
  readonly className?: string
  readonly isLoading?: boolean
  readonly onClick?: MouseEventHandler<HTMLButtonElement>
}

const BUTTON_VARIANTS = {
  BIG: "big",
  ALT: "alt",
  FORM_SUBMIT: "formSubmit",
}

const BUTTON_STYLES = {
  [BUTTON_VARIANTS.BIG]:
    "flex mt-8 bg-orange-600 hover:bg-red-600 hover:animate-none text-white rounded-md p-8 py-2 text-[2rem] leading-tight animate-pulse duration-75 focus:border-2 border-blue-500",
  [BUTTON_VARIANTS.ALT]:
    "flex mt-8 text-orange-600 bg-neutral-900 rounded-md p-8 py-2 text-[2rem] leading-tight animate-pulse hover:bg-neutral-800 hover:animate-none hover:ease-in-out duration-75 focus:border-2 border-blue-500",
  [BUTTON_VARIANTS.FORM_SUBMIT]:
    "mt-2 bg-orange-600 text-white rounded-md px-4 py-2 text-[1rem] leading-tight hover:bg-red-600 hover:ease-in-out duration-75 focus:border-2 border-blue-500",
  default:
    "mt-2 bg-orange-600 text-white rounded-md px-4 py-2 text-[1rem] leading-tight animate-pulse hover:bg-red-600 hover:ease-in-out duration-75 focus:border-2 border-blue-500"
}

type ButtonVariant = typeof BUTTON_VARIANTS[keyof typeof BUTTON_VARIANTS]

export default function ActionButton({ variant = null, children, className, isLoading = false, onClick }: Props) {

  const buttonStyle = variant ? BUTTON_STYLES[variant] : BUTTON_STYLES.default;
  const combinedStyle = `${buttonStyle} ${className}`.trim();
  const buttonType = variant === "formSubmit" ? "submit" : "button";

  return <>
    {isLoading ? <Spinner /> : <button type={buttonType} className={combinedStyle} disabled={isLoading} onClick={onClick}>{isLoading ? <Spinner /> : children}</button>}
  </>
}

