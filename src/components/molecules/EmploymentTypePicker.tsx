"use client";
import React, { useState } from 'react'
import RadioWithTextSquare from './RadioWithTextSquare'
import HomeSvg from '../atoms/HomeSvg';
import HybridSvg from '../atoms/HybridSvg';
import StationarySvg from '../atoms/StationarySvg';

export default function EmploymentTypePicker() {
  const [whichRadioIsActive, setWhichRadioIsActive] = useState<number>(0);

  return (
    <div className="flex flex-col">
      <label htmlFor="employmentType">*Employment Type:</label>
      <div className="flex flex-row gap-2">
        <RadioWithTextSquare
          radioId={0}
          whichRadioIsActive={whichRadioIsActive}
          setWhichRadioIsActiveAction={setWhichRadioIsActive}
          text="Remote"
        >
          <HomeSvg imageAlt={"Remote work"} className={`transition duration-75 ${0 === whichRadioIsActive ? "text-orange-600" : "text-white"}`} />
        </RadioWithTextSquare>
        <RadioWithTextSquare
          radioId={1}
          whichRadioIsActive={whichRadioIsActive}
          setWhichRadioIsActiveAction={setWhichRadioIsActive}
          text="Hybrid"
        >
          <HybridSvg imageAlt={"Hybrid work"} className={`transition duration-75 ${1 === whichRadioIsActive ? "text-orange-600" : "text-white"}`} />
        </RadioWithTextSquare>
        <RadioWithTextSquare
          radioId={2}
          whichRadioIsActive={whichRadioIsActive}
          setWhichRadioIsActiveAction={setWhichRadioIsActive}
          text="Stationary"
        >
          <StationarySvg imageAlt={"Remote work"} className={`transition duration-75 ${2 === whichRadioIsActive ? "text-orange-600" : "text-white"}`} />
        </RadioWithTextSquare>
      </div>
    </div>
  )
}

