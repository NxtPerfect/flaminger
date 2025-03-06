import React from 'react'
import SkillRectangle from '../atoms/SkillRectangle'
import { HumanLanguage, Technology } from '@/app/lib/definitions'
import LinkButton from '../organisms/LinkButton'

type Props = {
  label: string
  skills: HumanLanguage[] | Technology[] | { name: string, userId: number, experience: string }[]
  addMore?: boolean
}

export default function SkillList({ label, skills, addMore = true }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {`${label.at(0)?.toUpperCase()}${label.slice(1)}`}:
      <div className="flex flex-row flex-wrap gap-2 overflow-hidden">
        {skills && skills.map((skill, index) => {
          return (
            <SkillRectangle key={index}>
              <span className="font-semibold text-black dark:text-white">{skill.name}</span>: {'level' in skill ? `${skill.level}` : `${skill.experience} years`}
            </SkillRectangle>
          )
        })}
        {addMore &&
          <LinkButton variant="alt" href="/profile/edit">+Add More</LinkButton>}
      </div>
    </div>
  )
}
