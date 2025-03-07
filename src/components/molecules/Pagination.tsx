"use client";
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import LinkButton from '../organisms/LinkButton';

export default function Pagination() {
  const { offset } = useParams<{ offset: string }>();
  const currentPage = Number.parseInt(offset);
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
    <div className={`mt-8 flex flex-row gap-2
      px-4 py-1 justify-center items-center`}>
      {currentPage > 1 &&
        <LinkButton variant="navigation"
          href={`/offers/1`}
          className="hover:text-black/20 hover:dark:text-white/20
          p-2 text-xl focus:text-black/20 focus:dark:text-white/20"
        >
          1
        </LinkButton>}
      {currentPage - 4 > 0 &&
        <p>...</p>}
      {currentPage > 2 &&
        [currentPage - 2, currentPage - 1].map((prevPage, id) => {
          if (prevPage <= 1) return;
          return (
            <LinkButton variant="navigation"
              href={`/offers/${prevPage}`}
              className="hover:text-black/20 hover:dark:text-white/20
              p-2 text-xl focus:text-black/20 focus:dark:text-white/20"
              key={id}
            >
              {prevPage}
            </LinkButton>
          )
        })
      }
      <LinkButton variant="navigation"
        href={`/offers/${currentPage}`}
        className={`text-xl bg-black dark:bg-white p-2
        aspect-square rounded-2xl text-white dark:text-black
        hover:bg-black/40 focus:bg-black/40 hover:dark:bg-white/40
        focus:dark:bg-white/40 h-fit`}>
        {currentPage}
      </LinkButton>
      {currentPage + 1 < maxPages &&
        [currentPage + 1, currentPage + 2].map((nextPage, id) => {
          if (nextPage >= maxPages) return;
          return (
            <LinkButton variant="navigation"
              href={`/offers/${nextPage}`}
              className="hover:text-black/20 hover:dark:text-white/20
              p-2 text-xl focus:text-black/20 focus:dark:text-white/20"
              key={id}
            >
              {nextPage}
            </LinkButton>
          )
        })
      }
      {currentPage + 3 < maxPages &&
        <p>...</p>}
      {currentPage < maxPages &&
        <LinkButton variant="navigation"
          href={`/offers/${maxPages}`}
          className="hover:text-black/20 hover:dark:text-white/20
          p-2 text-xl focus:text-black/20 focus:dark:text-white/20"
        >
          {maxPages}
        </LinkButton>}
    </div>
  )
}

