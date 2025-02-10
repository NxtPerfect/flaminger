"use client";
import React from 'react'
import RadioWithTextSquare from './RadioWithTextSquare'
import HomeSvg from '../atoms/HomeSvg';
import HybridSvg from '../atoms/HybridSvg';
import StationarySvg from '../atoms/StationarySvg';
import { PickerProps } from '@/app/lib/definitions';

export default function EmploymentTypePicker({ whichRadioIsActive, setWhichRadioIsActiveAction }: PickerProps) {

  return (
    <div className="flex flex-col">
      <label htmlFor="employmentType">*Employment Type:</label>
      <div className="flex flex-row gap-2">
        <RadioWithTextSquare
          radioId={0}
          whichRadioIsActive={whichRadioIsActive}
          setWhichRadioIsActiveAction={setWhichRadioIsActiveAction}
          text="Remote"
          className="w-1/3"
        >
          <HomeSvg imageAlt={"Remote work"} className={`transition duration-75 ${0 === whichRadioIsActive ? "text-orange-600" : "text-white"}`} />
        </RadioWithTextSquare>
        <RadioWithTextSquare
          radioId={1}
          whichRadioIsActive={whichRadioIsActive}
          setWhichRadioIsActiveAction={setWhichRadioIsActiveAction}
          text="Hybrid"
          className="w-1/3"
        >
          <HybridSvg imageAlt={"Hybrid work"} className={`transition duration-75 ${1 === whichRadioIsActive ? "text-orange-600" : "text-white"}`} />
        </RadioWithTextSquare>
        <RadioWithTextSquare
          radioId={2}
          whichRadioIsActive={whichRadioIsActive}
          setWhichRadioIsActiveAction={setWhichRadioIsActiveAction}
          text="Stationary"
          className="w-1/3"
        >
          <StationarySvg imageAlt={"Remote work"} className={`transition duration-75 ${2 === whichRadioIsActive ? "text-orange-600" : "text-white"}`} />
        </RadioWithTextSquare>
      </div>
    </div>
  )
}

