"use client";
import Form from '@/components/organisms/Form';
import { useParams } from 'next/navigation';
import React from 'react'

export default function Page() {
  const params = useParams<{ id: string }>();


  return (
    <Form formType="applyToJob" jobId={Number.parseInt(params.id)} />
  )
}

