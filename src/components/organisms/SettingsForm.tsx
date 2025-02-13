import React from 'react'
import ActionButton from '../ActionButton'
import CityPicker from '../molecules/CityPicker'
import TextInput from '../atoms/TextInput'

export default function SettingsForm() {
  return (
    <form>
      <h1>
        Edit profile
      </h1>
      <div>
        <h2>Personal Information</h2>
        <TextInput name="firstname" placeholder="Steve" />
        <TextInput name="surname" placeholder="Jobs" />
        <CityPicker />
      </div>
      <div>
        <h2>Professional Information</h2>
        <span>Picker1</span>
        <span>Picker2</span>
      </div>
      <ActionButton variant="formSubmit">Save Settings</ActionButton>
    </form>
  )
}

