"use client";

import RadioWithTextSquare from "./RadioWithTextSquare";
import PartTimeSvg from "./PartTimeSvg";
import FullTimeSvg from "./FullTimeSvg";
import InternshipSvg from "./InternshipSvg";
import { PickerProps } from "@/app/lib/definitions";

export default function WorkhourTypePicker({ whichRadioIsActive, setWhichRadioIsActiveAction }: PickerProps) {

  function getWorkhourTypeByRadioId(id: number) {
    switch (id) {
      case 0:
        return "Full";
      case 1:
        return "Part";
      case 2:
        return "Intern";
      default:
        return "None";
    }
  }

  return (
    <div className="flex flex-col">
      <label htmlFor="workhourType">*Workhour Type:</label>
      <input type="hidden" name="workhourType" value={getWorkhourTypeByRadioId(whichRadioIsActive)} />
      <div className="flex flex-row gap-2">
        <RadioWithTextSquare
          radioId={0}
          whichRadioIsActive={whichRadioIsActive}
          setWhichRadioIsActiveAction={setWhichRadioIsActiveAction}
          text="Full-Time"
          className="w-1/3"
        >
          <FullTimeSvg imageAlt={"Full-Time"} className={`transition duration-75 ${0 === whichRadioIsActive ? "text-orange-600" : "text-black dark:text-white"}`} />
        </RadioWithTextSquare>
        <RadioWithTextSquare
          radioId={1}
          whichRadioIsActive={whichRadioIsActive}
          setWhichRadioIsActiveAction={setWhichRadioIsActiveAction}
          text="Part-Time"
          className="w-1/3"
        >
          <PartTimeSvg imageAlt={"Part-Time"} className={`transition duration-75 ${1 === whichRadioIsActive ? "text-orange-600" : "text-black dark:text-white"}`} />
        </RadioWithTextSquare>
        <RadioWithTextSquare
          radioId={2}
          whichRadioIsActive={whichRadioIsActive}
          setWhichRadioIsActiveAction={setWhichRadioIsActiveAction}
          text="Internship"
          className="w-1/3"
        >
          <InternshipSvg imageAlt={"Internship"} className={`transition duration-75 ${2 === whichRadioIsActive ? "text-orange-600" : "text-black dark:text-white"}`} />
        </RadioWithTextSquare>
      </div>
    </div>
  )
}
