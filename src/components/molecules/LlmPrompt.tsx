import { HumanLanguage, Technology } from '@/app/lib/definitions'
import React from 'react'
import ActionButton from '../atoms/ActionButton'
import OpenInExternalLlm from './OpenInExternalLlm'

type Props = {
  title: string
  company: string
  description: string
  requirements?: { tech: Technology[], langs: HumanLanguage[] }
  skills?: { technologies: Technology[], humanLanguages: HumanLanguage[] }
}

export default function LlmPrompt({ title, company, description, requirements, skills }: Props) {

  function copyTextToClipboard() {
    navigator.clipboard.writeText(prompt);
  }

  const parsedTechRequirements = requirements?.tech.map(
    (t) => `${t.name} ${t.experience} years`)
    .join(", ");
  const parsedLangsRequirements = requirements?.langs.map(
    (l) => `${l.name} ${l.level}`)
    .join(", ");

  const parsedSkillsTech = skills?.technologies && skills?.technologies.map(
    (t) => `${t.name} ${t.experience} years`)
    .join(", ");
  const parsedSkillsLangs = skills?.humanLanguages && skills?.humanLanguages.map(
    (l) => `${l.name} ${l.level}`)
    .join(", ");

  const prompt = `I am interested in applying for the position of ${title} at ${company}. Please assess my chances of being accepted based on the job description and requirements provided below. Having more years of experience or a higher CEFR level in languages is advantageous.

<jobDescription>${description}</jobDescription>
<requirements>
  <technologies>${parsedTechRequirements ?? ""}</technologies>
  <languages>${parsedLangsRequirements ?? ""}</languages>
</requirements>

My skills include:
<mySkills>
  <technologies>${parsedSkillsTech ?? ""}</technologies>
  <languages>${parsedSkillsLangs ?? ""}</languages>
</mySkills>

Please respond with one of the following: "likely", "unlikely", or "moderate".`.trim();
  return (
    <div className="flex flex-col rounded-md px-2 py-1 bg-neutral-400 dark:bg-neutral-800 w-full">
      <div className={`font-mono overflow-y-scroll max-h-[3lh]
min-w-fit max-w-[45svw]  text-pretty text-justify`}>
        {prompt}
      </div>
      <div className="flex gap-2 justify-self-start self-start">
        <ActionButton variant="llmCopy" onClick={copyTextToClipboard}
          className="bg-neutral-900 hover:bg-neutral-900 hover:text-white/60">
          Copy
        </ActionButton>
        <OpenInExternalLlm prompt={prompt} />
      </div>
    </div>
  )
}

