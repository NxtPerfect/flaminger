"use client";
import { FEATURE_FLAG_QUESTIONS } from '@/app/lib/definitions';
import ActionButton from '@/components/atoms/ActionButton';
import Form from '@/components/organisms/Form';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'

export default function Page() {
  const params = useParams<{ id: string }>();
  const jobId = params.id;
  const router = useRouter();

  async function handleApply() {
    // event.preventDefault();
    const formData = new FormData();
    formData.set('jobId', jobId);
    await fetch(`/api/offer/${jobId}/apply`, {
      method: "PUT",
      body: formData
    })
      .then(() => {
        router.push('/');
        router.refresh();
      }
      )
  }

  return (
    <>
      {FEATURE_FLAG_QUESTIONS && <Form formType="applyToJob" jobId={Number.parseInt(params.id)} />}
      {!FEATURE_FLAG_QUESTIONS && <ActionButton
        onClick={handleApply}>
        Continue
      </ActionButton>
      }
    </>
  )
}

