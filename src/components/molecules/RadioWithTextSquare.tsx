"use client";
import React, { Dispatch, SetStateAction } from 'react'
import Radio from '../atoms/Radio';

type Props = {
  className?: string
  children: React.ReactNode
  whichRadioIsActive: number
  setWhichRadioIsActiveAction: Dispatch<SetStateAction<number>>
  radioId: number
  text: string
}

export default function RadioWithTextSquare(
  {
    className,
    children,
    whichRadioIsActive,
    setWhichRadioIsActiveAction,
    radioId,
    text
  }: Props) {
  const activeStyle = "border-orange-600 bg-neutral-200 dark:bg-neutral-600 text-black dark:text-white";
  const style = `border-2 flex flex-row gap-2 justify-center items-center rounded-md group hover:border-orange-600 transition duration-75 min-h-[4lh] p-4 cursor-pointer ${className} ${radioId === whichRadioIsActive ? activeStyle : "bg-neutral-100 dark:bg-neutral-700 text-black dark:text-white"}`.trim();
  return (
    <div className={style} onClick={() => setWhichRadioIsActiveAction(radioId)}>
      {children}
      <Radio isActive={radioId === whichRadioIsActive} name="radio">{text}</Radio>
    </div>
  )
}

