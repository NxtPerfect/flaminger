import { HumanLanguage, Technology } from '@/app/lib/definitions'
import React from 'react'
import ActionButton from '../atoms/ActionButton'
import OpenInExternalLlm from './OpenInExternalLlm'

type Props = {
  title: string
  company: string
  description: string
  requirements?: { tech: Technology[], langs: HumanLanguage[] }
  skills?: { tech: Technology[], langs: HumanLanguage[] }
}

export default function LlmPrompt({ title, company, description, requirements, skills }: Props) {

  function copyTextToClipboard() {
    navigator.clipboard.writeText(prompt);
  }

  const prompt = `I want to apply to job ${title} at company ${company}.
Now I'll give you job description, required technologies and human languages,
then I'll give you my skills. Your role is to estimate what are the odds
that I get accepted for the job. If you think it's unlikely, say "unlikely",
if it's likely, say "likely" if the chances are neither likely nor unlikely,
say "it's hard to judge". Here's the relevant information:
<jobDescription>${description}</jobDescription>
<requirements>${requirements}</requirements>
<mySkills>${skills}</mySkills>`.trim();
  return (
    <div className="flex flex-row rounded-md px-2 py-1 bg-neutral-600 w-full">
      <div className="font-mono text-wrap max-w-[40ch]">
        {prompt}
      </div>
      <div className="flex justify-self-end self-end">
        <ActionButton variant="llmCopy" onClick={copyTextToClipboard}>
          Copy
        </ActionButton>
        <OpenInExternalLlm prompt={prompt} />
      </div>
    </div>
  )
}

