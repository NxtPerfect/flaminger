import React from 'react'
import TextInput from '../atoms/TextInput'

export default function EmailInput() {
  return (
    <TextInput name="email" id="email" placeholder="sample@email.io"
      required={true} pattern={`\\S+@\\S+\\.\\S+`} autocomplete="email">
      Email address
    </TextInput>
  )
}

