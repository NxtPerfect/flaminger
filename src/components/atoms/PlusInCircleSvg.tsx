import React from 'react'
import Svg from './Svg';

type Props = {
  imageAlt: string
  className?: string
}

export default function PlusInCircleSvg({ imageAlt, className }: Props) {
  const style = `size-6 ${className}`.trim();
  return (
    <Svg viewBox="0 0 24 24" className={style} imageAlt={imageAlt}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </Svg>
  )
}

