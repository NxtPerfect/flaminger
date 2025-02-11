"use client";
import { RequiredTechnology } from '@/app/lib/definitions';
import ActionButton from '@/components/ActionButton';
import TextAreaInput from '@/components/atoms/TextAreaInput'
import TextInput from '@/components/atoms/TextInput'
import CityPicker from '@/components/molecules/CityPicker'
import ContractTypePicker from '@/components/molecules/ContractTypePicker'
import EmploymentTypePicker from '@/components/molecules/EmploymentTypePicker'
import SalaryRange from '@/components/molecules/SalaryRange'
import TechnologiesPicker from '@/components/molecules/TechnologiesPicker'
import WorkhourTypePicker from '@/components/molecules/WorkhourTypePicker'
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'

export default function Page() {
  const [employmentActiveRadio, setEmploymentActiveRadio] = useState<number>(0);
  const [contractActiveRadio, setContractActiveRadio] = useState<number>(0);
  const [workhourActiveRadio, setWorkhourActiveRadio] = useState<number>(0);
  const [technologies, setTechnologies] = useState<RequiredTechnology[]>([]);
  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    // get salary range
    // get city
    // get employment, contract and workhour type
    // get technologies
    e.preventDefault();
    console.log(e.currentTarget);
    const formData = new FormData(e.currentTarget);
    console.log(formData);

    const addOffer = async () => {
      await fetch('/api/offer/add', {
        method: "PUT",
        body: formData
      }).then(() => {
        router.push('/');
        router.refresh();
      }).catch((err) => {
        console.error(err);
      })
    }
    addOffer();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 bg-neutral-800 rounded-md px-8 py-4 w-[70ch] min-w-[30ch] max-w-[80ch]"
    >
      <TextInput name="title" placeholder="Junior React Developer" required={true} pattern="^(?=.{1,50}$)[A-Za-z]+(?:['_.\s][A-Za-z]+)*$">Job name:</TextInput>
      <TextAreaInput name="description" required={true} placeholder="Our flexible and dynamic team is looking for a passionate developer.">Description:</TextAreaInput>
      <SalaryRange />
      <CityPicker />
      <EmploymentTypePicker whichRadioIsActive={employmentActiveRadio} setWhichRadioIsActiveAction={setEmploymentActiveRadio} />
      <ContractTypePicker whichRadioIsActive={contractActiveRadio} setWhichRadioIsActiveAction={setContractActiveRadio} />
      <WorkhourTypePicker whichRadioIsActive={workhourActiveRadio} setWhichRadioIsActiveAction={setWorkhourActiveRadio} />
      <TechnologiesPicker technologies={technologies} setTechnologiesAction={setTechnologies} />
      <ActionButton variant="formSubmit">Create offer</ActionButton>
    </form>
  )
}

