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

  console.log("Skills", skills);

  const parsedTechRequirements = requirements?.tech.map(
    (t) => `${t.name} ${t.experience} years`)
    .join(", ");
  const parsedLangsRequirements = requirements?.langs.map(
    (l) => `${l.name} ${l.level}`)
    .join(", ");

  const parsedSkillsTech = skills?.technologies.map(
    (t) => `${t.name} ${t.experience} years`)
    .join(", ");
  const parsedSkillsLangs = skills?.humanLanguages.map(
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
    <div className="flex flex-row rounded-md px-2 py-1 bg-neutral-800 w-full">
      <div className={`font-mono overflow-y-scroll max-h-[3lh]
min-w-[35svw] max-w-[45svw] mb-[1.5lh] text-pretty text-justify`}>
        {prompt}
      </div>
      <div className="flex gap-2 justify-self-end self-end absolute">
        <ActionButton variant="llmCopy" onClick={copyTextToClipboard}
          className="bg-neutral-900 hover:bg-neutral-900 hover:text-white/60">
          Copy
        </ActionButton>
        <OpenInExternalLlm prompt={prompt} />
      </div>
    </div>
  )
}

