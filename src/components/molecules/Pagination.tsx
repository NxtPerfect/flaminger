"use client";
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import LinkButton from '../organisms/LinkButton';

export default function Pagination() {
  const { offset } = useParams<{ offset: string }>();
  const [maxPages, setMaxPages] = useState<number>(1);

  useEffect(() => {
    const fetchLength = async () => {
      await fetch(`/api/offers/length`)
        .then(async (res) => {
          const responseJson = await res.json();
          setMaxPages(responseJson.count);
        })
    }
    fetchLength();
  }, [])


  return (
    <div className="flex flex-row gap-4 border-2 border-neutral-600 px-4 py-1">
      <LinkButton variant="navigation"
        href={`/offers/1`}>
        First
      </LinkButton>
      <LinkButton variant="navigation"
        href={`/offers/${Number.parseInt(offset) > 1 ?
          Number.parseInt(offset) - 1 :
          1}`}>
        Previous
      </LinkButton>
      <p> Page </p>
      <input name="page" type="number" placeholder={offset} />
      <p> of {maxPages}</p>
      <LinkButton variant="navigation"
        href={`/offers/${Number.parseInt(offset) < maxPages ?
          Number.parseInt(offset) + 1 :
          maxPages}`}>
        Next
      </LinkButton>
      <LinkButton variant="navigation"
        href={`/offers/${maxPages}`}>
        Last
      </LinkButton>
    </div>
  )
}

