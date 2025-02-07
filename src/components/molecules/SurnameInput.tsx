import React from 'react'
import TextInput from '../atoms/TextInput'

export default function SurnameInput() {
  return (
    <TextInput name="surname" placeholder="Jobs" required={true}>
      Surname
    </TextInput>
  )
}

