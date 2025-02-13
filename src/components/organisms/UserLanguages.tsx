import React from 'react'
import { HumanLanguage } from '@/app/lib/definitions'
import SkillList from '../molecules/SkillList'

type Props = {
  languages: HumanLanguage[]
}

export default function UserLanguages({ languages }: Props) {
  return (
    <SkillList label="languages" skills={languages} />
  )
}

