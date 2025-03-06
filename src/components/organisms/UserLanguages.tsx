import React from 'react'
import { HumanLanguage } from '@/app/lib/definitions'
import SkillList from '../molecules/SkillList'

type Props = {
  languages: HumanLanguage[]
  addMore?: boolean
}

export default function UserLanguages({ languages, addMore }: Props) {
  return (
    <SkillList label="languages" skills={languages} addMore={addMore} />
  )
}

