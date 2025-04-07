import React from 'react'

type Props = {
  answers: string[]
}

export default function InputNewAnswer({ answers }: Props) {
  return (
    <div>
      {answers.length === 0 && "Add Answer"}
    </div>
  )
}

