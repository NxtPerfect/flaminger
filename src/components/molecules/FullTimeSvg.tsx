import React from 'react'
import { SvgProps } from '@/app/lib/definitions'
import Svg from '../atoms/Svg'

export default function FullTimeSvg({ className, imageAlt }: SvgProps) {
  return (
    <Svg className={className} imageAlt={imageAlt}>
      <path
        fill="currentColor"
        d="M6 2v6h.01L6 8.01L10 12l-4 4l.01.01H6V22h12v-5.99h-.01L18 16l-4-4l4-3.99l-.01-.01H18V2z"
      />
    </Svg>
  )
}

