import { Filter, LangRequirement, OfferWithCompanyInfo, TechRequirement } from "@/app/lib/definitions";
import { useCallback, useEffect, useState } from "react";

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
    if (filter.jobType.length > 0) {
      for (let i = 0; i < filter.jobType.length; i++) {
        url += "&jobType=" + filter.jobType[i];
      }
    }
    if (filter.workhourType.length > 0) {
      for (let i = 0; i < filter.workhourType.length; i++) {
        url += "&workhourType=" + filter.workhourType[i];
      }
    }
    if (filter.contractType.length > 0) {
      for (let i = 0; i < filter.contractType.length; i++) {
        url += "&contractType=" + filter.contractType[i];
      }
    }
    if (filter.city) url += "&city=" + filter.city;
    if (filter.technologies.length > 0) {
      for (let i = 0; i < filter.technologies.length; i++) {
        url += "&technology=" + filter.technologies[i].name;
        url += "&experience=" + filter.technologies[i].experience;
      }
    }
    if (filter.humanLanguages.length > 0) {
      for (let i = 0; i < filter.humanLanguages.length; i++) {
        url += "&language=" + filter.humanLanguages[i].name;
        url += "&level=" + filter.humanLanguages[i].level;
      }
    }
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
