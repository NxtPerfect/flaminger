import React from 'react'
import SkillRectangle from '../atoms/SkillRectangle'
import { HumanLanguage, Technology } from '@/app/lib/definitions'
import LinkButton from '../organisms/LinkButton'

type Props = {
  label: string
  skills: HumanLanguage[] | Technology[]
}

export default function SkillList({ label, skills }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {`${label.at(0)?.toUpperCase()}${label.slice(1)}`}:
      <div className="flex flex-row flex-wrap gap-2 overflow-hidden">
        {skills && skills.map((skill: HumanLanguage | Technology, index: number) => {
          return (
            <SkillRectangle key={index}>
              <span className="font-semibold">{skill.name}</span>: {'level' in skill ? `${skill.level}` : `${skill.experience} years`}
            </SkillRectangle>
          )
        })}
        <LinkButton variant="alt" href="/profile/edit">+Add More</LinkButton>
      </div>
    </div>
  )
}
