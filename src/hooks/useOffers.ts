import { HumanLanguage, LangRequirement, OfferWithCompanyInfo, Technology, TechRequirement } from "@/app/lib/definitions";
import { useCallback, useEffect, useState } from "react";

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
  const [technologies, setTechnology] = useState<TechRequirement[]>([]);
  const [humanLanguages, setHumanLanguages] = useState<LangRequirement[]>([]);

  const fetchOffers = useCallback(async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    setIsLoading(true);
    await fetch(`/api/offers/${offset}`, { signal })
      .then(async (res) => {
        const responseJson = await res.json();
        setOffers(responseJson.offers);
        setTechnology(responseJson.tech);
        setHumanLanguages(responseJson.langs);
      })
    setIsLoading(false);
    return () => controller.abort();
  }, [offset])

  useEffect(() => {
    fetchOffers();
  }, [offset])

  return {
    isLoading,
    fetchOffers,
    offers,
    setOffers,
    offset,
    setOffset,
    technologies,
    humanLanguages
  }
}
