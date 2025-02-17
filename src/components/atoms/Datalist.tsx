import React from 'react'

type Props = {
  id: string
  children?: React.ReactNode
}

export default function Datalist({id, children} : Props) {
  return (
  <datalist id={id}>
      {children}
  </datalist>
  )
}
