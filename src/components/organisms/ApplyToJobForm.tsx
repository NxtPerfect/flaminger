import { useRouter } from 'next/navigation';
import React, { FormEvent } from 'react'
import ActionButton from '../ActionButton';

type Props = {
  jobId?: number
}

export default function ApplyToJobForm({ jobId = 0 }: Props) {
  const router = useRouter();
  const formStyle = "flex flex-col gap-2 bg-neutral-800 rounded-md px-8 py-4 min-w-[30ch] max-w-[40ch]";

  async function handleApply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
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
    <form
      className={formStyle}
      onSubmit={handleApply}
    >
      <input type="hidden" value={jobId} name="jobId" />
      <label>
        Do you use AI Tools?
      </label>
      <div>
        <input type="checkbox" />
        Yes
      </div>
      <label>
        Are you willing to relocate?
      </label>
      <div className="flex flex-row gap-2">
        <input type="radio" value="yes" />
        <label>Yes</label>
      </div>
      <div className="flex flex-row gap-2">
        <input type="radio" value="no" />
        <label>No</label>
      </div>
      <label>
        Type of employment you want:
      </label>
      <select>
        <option>Remote</option>
        <option>Hybrid</option>
        <option>Stationary</option>
      </select>
      <label>
        Describe briefly why you should be accepted for this position.
      </label>
      <input type="text" minLength={1} />
      <label>
        For human verification, what is the name for an animal whose name is duck:
      </label>
      <input type="text" maxLength={16} />
      <ActionButton variant="formSubmit">Apply</ActionButton>
    </form>
  )
}

