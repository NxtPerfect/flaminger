"use state";
import React, { useState } from 'react'
import ActionButton from '../ActionButton'
import CityPicker from '../molecules/CityPicker'
import TextInput from '../atoms/TextInput'
import TechnologiesPicker from '../molecules/TechnologiesPicker'
import { Technology } from '@/app/lib/definitions';

export default function SettingsForm() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  return (
    <form>
      <h1>
        Edit profile
      </h1>
      <div>
        <h2>Personal Information</h2>
        <TextInput name="firstname" placeholder="Steve" >First Name:</TextInput>
        <TextInput name="surname" placeholder="Jobs" >Surname:</TextInput>
        <CityPicker>City of residence:</CityPicker>
      </div>
      <div>
        <h2>Professional Information</h2>
        <TechnologiesPicker technologies={technologies} setTechnologiesAction={setTechnologies}/>
      </div>
      <ActionButton variant="formSubmit">Save Settings</ActionButton>
    </form>
  )
}

