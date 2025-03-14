import React, { useState } from 'react'
import ChevronDownSvg from './ChevronDownSvg';

type Props = {
  prompt: string
}

export default function OpenInExternalLlm({ prompt }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const encodedPrompt = encodeURIComponent(prompt);

  function openUrlInNewTab(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  const providers = [
    {
      name: "ChatGPT",
      url: `https://chat.openai.com/?q=${encodedPrompt}`,
    },
    {
      name: "Claude",
      url: `https://claude.ai/new?q=${encodedPrompt}`,
    },
    {
      name: "Bing",
      url: `https://www.bing.com/search?showconv=1&sendquery=1&q=${encodedPrompt}`,
    }
  ]

  return (
    <div onClick={() => setIsOpen(cur => !cur)}
      className={`text-white hover:text-white/60 cursor-pointer flex flex-row
bg-neutral-900 justify-center rounded-md px-2 py-1`}>
      Open in
      <ChevronDownSvg />
      {isOpen &&
        <div className={`flex flex-col gap-2 absolute mt-6 bg-neutral-900
p-2 rounded-md text-white`}>
          {providers.map((provider, index) => {
            return (
              <button onClick={() => openUrlInNewTab(provider.url)}
                key={index}
                className="hover:bg-neutral-800 focus:bg-neutral-800 w-full px-4 py-1 rounded-md">
                {provider.name}
              </button>
            )
          })}
        </div>}
    </div>
  )
}

