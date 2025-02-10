import React from 'react'
import Svg from '../atoms/Svg'
import { SvgProps } from '@/app/lib/definitions'

export default function InternshipSvg({ className, imageAlt }: SvgProps) {
  return (
    <Svg className={className} imageAlt={imageAlt} viewBox="0 0 16 16">
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M14.25 9.25V6L8 2.75L1.75 6L8 9.25l3.25-1.5v3.5c0 1-1.5 2-3.25 2s-3.25-1-3.25-2v-3.5"
      />
    </Svg>
  )
}

