import React from 'react'
import Checkbox from '../atoms/Checkbox'

export default function DataConsentCheckbox() {
  return (
    <Checkbox name="dataConsent" required={true} className='mt-8'>
      I consent to handing over my data to Flaminger for purpose of correctly working platform.
    </Checkbox>
  )
}

