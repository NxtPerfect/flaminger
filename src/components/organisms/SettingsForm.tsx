"use client";
import React, { FormEvent, MouseEvent, useState } from 'react'
import CityPicker from '../molecules/CityPicker'
import TextInput from '../atoms/TextInput'
import TechnologiesPicker from '../molecules/TechnologiesPicker'
import { HumanLanguage, Technology } from '@/app/lib/definitions';
import { useRouter } from 'next/navigation';
import ErrorMessage from '../atoms/ErrorMessage';
import HumanLanguagesPicker from '../molecules/HumanLanguagesPicker';
import ActionButton from '../atoms/ActionButton';

type ReturnData = {
  readonly errorType?: string
  readonly status: number
}

export default function SettingsForm() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [humanLanguages, setHumanLanguages] = useState<HumanLanguage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch('/api/profile/edit', {
        method: "PUT",
        body: formData
      });
      const data = await response.json();
      const error = getErrorIfBadRequest(data);
      if (error) {
        setError(error);
        return;
      }
      router.push('/profile');
    } finally {
      setIsLoading(false);
    }
    return;
  }

  function getErrorIfBadRequest(data: ReturnData) {
    if (isEmptyFields(data)) {
      return ERROR_MESSAGES[ERROR_VARIANTS.EMPTY_FIELDS];
    }
    if (isBadData(data)) {
      return ERROR_MESSAGES[ERROR_VARIANTS.BAD_DATA];
    }
    return;
  }

  function isEmptyFields(data: ReturnData) {
    return data.errorType === "emptyFields";
  }

  function isBadData(data: ReturnData) {
    return data.errorType === "badData";
  }

  const ERROR_VARIANTS = {
    BAD_DATA: "badData",
    EMPTY_FIELDS: "someFieldsAreEmpty",
    OTHER: "unknownError"
  }


  const ERROR_MESSAGES = {
    [ERROR_VARIANTS.BAD_DATA]: "Ensure all fields are valid.",
    [ERROR_VARIANTS.EMPTY_FIELDS]: "Some fields are empty. Populate all fields.",
    [ERROR_VARIANTS.OTHER]: "Unknown error. Please report the circumstances of the situation."
  }

  function addTechnology() {
    if (technologies.length > 20) return;
    setTechnologies((cur) => [...cur, { name: "", experience: 0 }]);
  }

  function removeTechnology(e: MouseEvent<HTMLButtonElement>, index: number) {
    e.preventDefault();
    if (technologies.length === 0) return;
    setTechnologies((cur) => cur.filter((_, techIndex) => techIndex !== index));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-md p-8 bg-neutral-200
      dark:bg-neutral-800/80 text-black dark:text-white">
      <h1 className="font-bold text-xl">
        Profile
      </h1>
      <div className="flex flex-col border-2 bg-neutral-400/20
        dark:bg-neutral-600/20 rounded-md p-4 gap-2">
        <h2 className="text-lg font-semibold">Personal Information</h2>
        <TextInput name="firstname" placeholder="Steve" >First Name:</TextInput>
        <TextInput name="surname" placeholder="Jobs" >Surname:</TextInput>
        <CityPicker>City of residence:</CityPicker>
      </div>
      <div className="flex flex-col border-2 bg-neutral-400/20 dark:bg-neutral-600/20 rounded-md p-4 gap-2">
        <h2 className="text-lg font-semibold">Professional Information</h2>
        <TechnologiesPicker
          technologies={technologies}
          addTechnologyAction={addTechnology}
          removeTechnologyAction={removeTechnology}>
          Known Technologies:
        </TechnologiesPicker>
        <HumanLanguagesPicker humanLanguages={humanLanguages} setHumanLanguagesAction={setHumanLanguages}>Known Languages:</HumanLanguagesPicker>
      </div>
      <ActionButton variant="formSubmit" isLoading={isLoading}>Save Settings</ActionButton>
      {error && <ErrorMessage>error</ErrorMessage>}
    </form>
  )
}

