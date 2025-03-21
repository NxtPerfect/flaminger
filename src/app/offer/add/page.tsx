"use client";
import { HumanLanguage, Technology } from '@/app/lib/definitions';
import ActionButton from '@/components/atoms/ActionButton';
import TextAreaInput from '@/components/atoms/TextAreaInput'
import TextInput from '@/components/atoms/TextInput'
import CityPicker from '@/components/molecules/CityPicker'
import ContractTypePicker from '@/components/molecules/ContractTypePicker'
import EmploymentTypePicker from '@/components/molecules/EmploymentTypePicker'
import HumanLanguagesPicker from '@/components/molecules/HumanLanguagesPicker';
import SalaryRange from '@/components/molecules/SalaryRange'
import TechnologiesPicker from '@/components/molecules/TechnologiesPicker'
import WorkhourTypePicker from '@/components/molecules/WorkhourTypePicker'
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'

export default function Page() {
  const [employmentActiveRadio, setEmploymentActiveRadio] = useState<number>(0);
  const [contractActiveRadio, setContractActiveRadio] = useState<number>(0);
  const [workhourActiveRadio, setWorkhourActiveRadio] = useState<number>(0);
  const [technologies, setTechnologies] = useState<Technology[]>([{ name: "Javascript", experience: 2 }]);
  const [humanLanguages, setHumanLanguages] = useState<HumanLanguage[]>([{ name: "German", level: "A1" }]);
  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

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
      className={`flex flex-col gap-8 bg-neutral-400
      dark:bg-neutral-800 rounded-md px-8 py-4 min-w-[30ch]
      max-w-[80ch] text-white`}
    >
      <TextInput
        name="title"
        placeholder="Junior React Developer"
        required={true}
        pattern={`^(?=.{1,50}$)[A-Za-z]+(?:[\\s'_.][A-Za-z]+)*$`}>
        Job name:
      </TextInput>
      <TextAreaInput
        name="description"
        required={true}
        placeholder="Our flexible and dynamic team is looking for a passionate developer.">
        Description:
      </TextAreaInput>
      <SalaryRange />
      <CityPicker />
      <EmploymentTypePicker
        whichRadioIsActive={employmentActiveRadio}
        setWhichRadioIsActiveAction={setEmploymentActiveRadio} />
      <ContractTypePicker
        whichRadioIsActive={contractActiveRadio}
        setWhichRadioIsActiveAction={setContractActiveRadio} />
      <WorkhourTypePicker
        whichRadioIsActive={workhourActiveRadio}
        setWhichRadioIsActiveAction={setWorkhourActiveRadio} />
      <TechnologiesPicker
        technologies={technologies}
        setTechnologiesAction={setTechnologies} />
      <HumanLanguagesPicker
        humanLanguages={humanLanguages}
        setHumanLanguagesAction={setHumanLanguages} />
      <ActionButton variant="formSubmit">Create offer</ActionButton>
    </form>
  )
}

