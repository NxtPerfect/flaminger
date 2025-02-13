import React from 'react'
import { Technology } from '@/app/lib/definitions'
import SkillList from '../molecules/SkillList'

type Props = {
  technologies: Technology[]
}

export default function UserTechnologies({ technologies }: Props) {
  return (
    <SkillList label="technologies" skills={technologies} />
  )
}

