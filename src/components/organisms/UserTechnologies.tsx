import React from 'react'
import { Technology } from '@/app/lib/definitions'
import SkillList from '../molecules/SkillList'

type Props = {
  technologies: Technology[] | { name: string, userId: number, experience: string }[]
  addMore?: boolean
}

export default function UserTechnologies({ technologies, addMore }: Props) {
  return (
    <SkillList label="technologies" skills={technologies} addMore={addMore} />
  )
}

