import React from 'react'
import TextInput from '../atoms/TextInput'

export default function FirstnameInput() {
  return (
    <TextInput name="firstname" placeholder="Steve" required={true}>
      First Name
    </TextInput>
  )
}

