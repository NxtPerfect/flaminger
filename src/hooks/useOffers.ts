import { HumanLanguage, OfferWithCompanyInfo, Technology } from "@/app/lib/definitions";
import { useCallback, useEffect, useState } from "react";

type techRequirement = {
  jobId: number,
  tech: {
    name: string,
    experience: string
  }[]
}

type langRequirement = {
  jobId: number,
  langs: {
    name: string,
    level: string
  }[]
}

export type ModalData = {
  id: number
  title: string
  description: string
  logoPath: string
  acceptanceRate: string
  requirements: Requirements
  status: string
  isNotLoggedIn: boolean
  companyName: string
}

type Requirements = {
  tech: Technology[]
  langs: HumanLanguage[]
}

export function useOffers() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [offers, setOffers] = useState<OfferWithCompanyInfo[]>([]);
  const [offset, setOffset] = useState<number>(1);
  const [technologies, setTechnology] = useState<techRequirement[]>([]);
  const [humanLanguages, setHumanLanguages] = useState<langRequirement[]>([]);

  const fetchOffers = useCallback(async () => {
    setIsLoading(true);
    const parsedOffset = offset;
    await fetch(`/api/offers/${parsedOffset}`)
      .then(async (res) => {
        const responseJson = await res.json();
        setOffers(responseJson.offers);
        setTechnology(responseJson.tech);
        setHumanLanguages(responseJson.langs);
      })
    setIsLoading(false);
  }, [offset])

  useEffect(() => {
    fetchOffers();
  }, [offset])

  return {
    isLoading,
    fetchOffers,
    offers,
    offset,
    setOffset,
    technologies,
    humanLanguages
  }
}
