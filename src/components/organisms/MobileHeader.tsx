"use client";
import React from 'react'
import BurgerMenuSvg from '../atoms/BurgerMenuSvg'

export default function MobileHeader() {
  const mobileBurgerMenu = "md:visible"

  function showMenu() {
    // show menu
  }

  return (
    <header className={`visible md:hidden bg-red-500 sticky top-0
          min-h-[6svh] w-full text-xl ${mobileBurgerMenu}`}>
      <BurgerMenuSvg onClickAction={showMenu} />
    </header>
  )
}

