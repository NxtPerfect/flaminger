import React from 'react'
import Svg from '../atoms/Svg'
import { SvgProps } from '@/app/lib/definitions'

export default function PartTimeSvg({ className, imageAlt }: SvgProps) {
  return (
    <Svg className={className} imageAlt={imageAlt}>
      <path
        fill="currentColor"
        d="m18 22l-.01-6L14 12l3.99-4.01L18 2H6v6l4 4l-4 3.99V22zM8 7.5V4h8v3.5l-4 4z"
      />
    </Svg>
  )
}

