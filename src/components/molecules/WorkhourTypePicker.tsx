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
        return "full";
      case 1:
        return "part";
      case 2:
        return "intern";
      default:
        return "full";
    }
  }

  return (
    <div className="flex flex-col">
      <label htmlFor="workhourType">*Workhour Type:</label>
      <input type="hidden" name="workhourType" value={getWorkhourTypeByRadioId(whichRadioIsActive)} />
      <div className="flex flex-col md:flex-row gap-2">
        <RadioWithTextSquare
          radioId={0}
          whichRadioIsActive={whichRadioIsActive}
          setWhichRadioIsActiveAction={setWhichRadioIsActiveAction}
          text="Full-Time"
          className="w-full md:w-1/3"
        >
          <FullTimeSvg
            imageAlt={"Full-Time"}
            className={`transition duration-75 ${0 === whichRadioIsActive ?
              "text-orange-600" : "text-black dark:text-white"}`} />
        </RadioWithTextSquare>
        <RadioWithTextSquare
          radioId={1}
          whichRadioIsActive={whichRadioIsActive}
          setWhichRadioIsActiveAction={setWhichRadioIsActiveAction}
          text="Part-Time"
          className="w-full md:w-1/3"
        >
          <PartTimeSvg
            imageAlt={"Part-Time"}
            className={`transition duration-75 ${1 === whichRadioIsActive ?
              "text-orange-600" : "text-black dark:text-white"}`} />
        </RadioWithTextSquare>
        <RadioWithTextSquare
          radioId={2}
          whichRadioIsActive={whichRadioIsActive}
          setWhichRadioIsActiveAction={setWhichRadioIsActiveAction}
          text="Internship"
          className="w-full md:w-1/3"
        >
          <InternshipSvg
            imageAlt={"Internship"}
            className={`transition duration-75 ${2 === whichRadioIsActive ?
              "text-orange-600" : "text-black dark:text-white"}`} />
        </RadioWithTextSquare>
      </div>
    </div>
  )
}
