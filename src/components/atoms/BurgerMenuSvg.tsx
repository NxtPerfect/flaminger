"use client";
import React from 'react'
import Svg from './Svg'

type Props = {
  onClickAction: () => void
}

export default function BurgerMenuSvg({ onClickAction }: Props) {
  return (
    <Svg viewBox="0 0 24 24" imageAlt="burger menu"
      onClick={onClickAction} className='size-12 cursor-pointer'>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </Svg>
  )
}

