"use client";
import Form from '@/components/Form';
import { useParams } from 'next/navigation';
import React from 'react'

export default function page() {
  const params = useParams<{ id: string }>();


  return (
    <Form formType="applyToJob" jobId={Number.parseInt(params.id)} />
  )
}

