"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ActionButton from '../atoms/ActionButton';

type Props = {
  offset: number
  setOffsetAction: Dispatch<SetStateAction<number>>
}

export default function PaginationTest({ offset, setOffsetAction }: Props) {
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
      {offset > 1 &&
        <ActionButton variant="navigation"
          onClick={() => setOffsetAction(() => 1)}
          className={`hover:text-black/20 hover:dark:text-white/20
          p-2 text-xl focus:text-black/20 focus:dark:text-white/20`}
        >
          1
        </ActionButton>}
      {offset - 4 > 0 &&
        <p>...</p>}
      {offset > 2 &&
        [offset - 2, offset - 1].map((prevPage, id) => {
          if (prevPage <= 1) return;
          return (
            <ActionButton variant="navigation"
              onClick={() => setOffsetAction(() => prevPage)}
              className={`hover:text-black/20 hover:dark:text-white/20
              p-2 text-xl focus:text-black/20 focus:dark:text-white/20`}
              key={id}
            >
              {prevPage}
            </ActionButton>
          )
        })
      }
      <ActionButton variant="navigation"
        onClick={() => setOffsetAction(() => offset)}
        className={`text-xl bg-black dark:bg-white p-2
        aspect-square rounded-2xl text-white dark:text-black
        hover:bg-black/40 focus:bg-black/40 hover:dark:bg-white/40
        focus:dark:bg-white/40 h-fit`}>
        {offset}
      </ActionButton>
      {offset + 1 < maxPages &&
        [offset + 1, offset + 2].map((nextPage, id) => {
          if (nextPage >= maxPages) return;
          return (
            <ActionButton variant="navigation"
              onClick={() => setOffsetAction(() => nextPage)}
              className="hover:text-black/20 hover:dark:text-white/20
              p-2 text-xl focus:text-black/20 focus:dark:text-white/20"
              key={id}
            >
              {nextPage}
            </ActionButton>
          )
        })
      }
      {offset + 3 < maxPages &&
        <p>...</p>}
      {offset < maxPages &&
        <ActionButton variant="navigation"
          onClick={() => setOffsetAction(() => maxPages)}
          className="hover:text-black/20 hover:dark:text-white/20
          p-2 text-xl focus:text-black/20 focus:dark:text-white/20"
        >
          {maxPages}
        </ActionButton>}
    </div>
  )
}

