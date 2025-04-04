import React from 'react'
import Svg from './Svg';

type Props = {
  imageAlt: string
  className?: string
}

export default function CitySvg({ imageAlt, className }: Props) {
  const style = `size-6 ${className}`.trim();
  return (
    <Svg className={style} viewBox="0 0 24 24" imageAlt={imageAlt}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </Svg>
  )
}

