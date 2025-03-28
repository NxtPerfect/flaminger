import { Filter, HumanLanguage, LangRequirement, OfferWithCompanyInfo, Technology, TechRequirement } from "@/app/lib/definitions";
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

export function useOffers(filter: Filter) {
  const [offers, setOffers] = useState<OfferWithCompanyInfo[]>([]);
  const [offset, setOffset] = useState<number>(1);
  const [technologies, setTechnologies] = useState<TechRequirement[]>([]);
  const [humanLanguages, setHumanLanguages] = useState<LangRequirement[]>([]);
  const [maxPages, setMaxPages] = useState<number>(6);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchOffers();
  }, [offset]);

  function createFetchUrlFromFilter(offset: number) {
    let url = "/api/offers?page=" + offset;
    if (filter.title) url += "&title=" + filter.title;
    if (filter.companyName) url += "&companyName=" + filter.companyName;
    if (filter.minSalary) url += "&minSalary=" + filter.minSalary;
    if (filter.maxSalary) url += "&maxSalary=" + filter.maxSalary;
    if (filter.jobType) url += "&jobType=" + filter.jobType;
    if (filter.workhourType) url += "&workhourType=" + filter.workhourType;
    if (filter.contractType) url += "&contractType=" + filter.contractType;
    if (filter.city) url += "&city=" + filter.city;
    console.log("Filter on url", filter);
    return url;
  }

  const fetchOffers = useCallback(async () => {
    setIsLoading(true);
    const controller = new AbortController;
    const signal = controller.signal;
    const apiUrl = createFetchUrlFromFilter(offset);

    await fetch(apiUrl,
      {
        method: "GET",
        credentials: "include",
        signal
      })
      .then(async (res) => {
        const data = await res.json();
        setOffers(() => [...data.offers]);
        setTechnologies(() => [...data.tech]);
        setHumanLanguages(() => [...data.lang]);
        setMaxPages(() => data.count);
      })
      .finally(() => {
        controller.abort();
        setIsLoading(false);
      });
  }, [offset, filter]);


  return {
    isLoading,
    fetchOffers,
    offers,
    offset,
    setOffset,
    technologies,
    humanLanguages,
    maxPages
  }
}
