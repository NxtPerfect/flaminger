"use client";
import React, { useState } from 'react'
import BurgerMenuSvg from '../atoms/BurgerMenuSvg'
import OpenMobileHeader from '../molecules/OpenMobileHeader';

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function showMenu() {
    // show menu
    setIsOpen((cur) => !cur);
  }

  return (
    <header className={`visible md:hidden bg-red-500 sticky top-0 left-0
          min-h-[6svh] w-full text-xl p-4`}>
      <BurgerMenuSvg onClickAction={showMenu} />
      {isOpen &&
        <OpenMobileHeader />
      }
    </header>
  )
}

