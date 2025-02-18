import React from 'react'
import TextInput from '../atoms/TextInput'

export default function EmailInput() {
  return (
    <TextInput name="email" placeholder="sample@email.io" required={true} pattern={`\\S+@\\S+\\.\\S+`}>
      Email address
    </TextInput>
  )
}

