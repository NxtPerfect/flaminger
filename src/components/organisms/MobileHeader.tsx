"use client";
import React, { useState } from 'react'
import BurgerMenuSvg from '../atoms/BurgerMenuSvg'
import OpenMobileHeader from '../molecules/OpenMobileHeader';

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function showMenu() {
    setIsOpen((cur) => !cur);
  }

  return (
    <header className={`visible md:hidden fixed top-0 left-0
          min-h-[6svh] max-h-[10svh] w-fit text-xl p-4 z-50
          backdrop-blur-md bg-neutral-800/50 dark:bg-neutral-500/50 rounded-br-[50%] text-white`}>
      <BurgerMenuSvg onClickAction={showMenu} />
      {isOpen &&
        <OpenMobileHeader />
      }
    </header>
  )
}

