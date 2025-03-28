import React, { useState } from 'react'
import ActionButton from '../atoms/ActionButton'

type Props = {
  onClick: () => void
  children: React.ReactNode
}

export default function ButtonCheckboxFilter({ onClick, children }: Props) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const className = `${isActive ? "bg-green-500 hover:bg-green-600 focus:bg-green-600" : "bg-red-500/60"}`.trim();
  function handleClick() {
    setIsActive((cur) => !cur);
    onClick();
  }
  return (
    <ActionButton
      variant="checkbox"
      onClick={handleClick}
      className={className}>
      {children}
    </ActionButton>
  )
}

