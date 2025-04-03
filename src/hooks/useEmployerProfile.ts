import { Offer, UserApplications } from "@/app/lib/definitions";
import { useCallback, useEffect, useState } from "react";

type EmployerProfile = {
  isLoading: boolean
  name: string
  activeJobOffersPosted: Offer[]
  applicationsReceivedAmount: ApplicationsAmount
  acceptanceRate: string
}

type Data = {
  name: string
  jobOffersPosted: Offer[]
  applicationsAmount: DatabaseApplications[]
  acceptanceRate: string
}

type ApplicationsAmount = {
  new: number
  total: number
}

type DatabaseApplications = {
  jobs_table: Offer
  jobs_to_users_table: UserApplications
}

export function useEmployerProfile(): EmployerProfile {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [activeJobOffersPosted, setActiveJobOffersPosted] = useState<Offer[]>([]);
  const [applicationsReceivedAmount, setApplicationsReceivedAmount] = useState<ApplicationsAmount>({ new: 0, total: 0 });
  const [acceptanceRate, setAcceptanceRate] = useState<string>("0");

  const getProfile = useCallback(async () => {
    setIsLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    await fetch('/api/profile/employer', { method: "POST", cache: 'no-store', signal })
      .then(async (res) => {
        const responseJson = await res.json();
        if (!res.ok) {
          return;
        }
        setCompanyDataFromApi(responseJson);
      }).finally(() => {
        setIsLoading(false);
        controller.abort();
      })
  }, []);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  function setCompanyDataFromApi(response: Data) {
    setNameFromApi(response.name);
    setActiveJobOffersPostedFromApi(response.jobOffersPosted);
    setApplicationsReceivedAmountFromApi(response.applicationsAmount);
    setAcceptanceRateFromApi(response.acceptanceRate);
  }

  function setNameFromApi(name: string) {
    if (!name) {
      setName("NaN");
      return;
    }
    setName(name);
  }

  function setActiveJobOffersPostedFromApi(jobOffers: Offer[]) {
    const activeJobOffers = jobOffers.filter((j) => !j.isClosed);
    setActiveJobOffersPosted((cur) => [...cur, ...activeJobOffers]);
  }

  function setApplicationsReceivedAmountFromApi(applicationsAmount: DatabaseApplications[]) {
    if (applicationsAmount.length == 0) {
      setApplicationsReceivedAmount({ new: 0, total: 0 });
      return;
    }
    const newApplicationsCount = applicationsAmount.filter((a) => !a.jobs_table.isClosed).length;
    const totalApplicationsCount = applicationsAmount.length;
    setApplicationsReceivedAmount({
      new: newApplicationsCount,
      total: totalApplicationsCount
    });
  }

  function setAcceptanceRateFromApi(acceptanceRate: string) {
    if (!acceptanceRate) {
      setAcceptanceRate("0");
      return;
    }
    try {
      setAcceptanceRate(acceptanceRate);
    } catch {
      setAcceptanceRate("0");
    }
  }

  return {
    isLoading,
    name,
    activeJobOffersPosted,
    applicationsReceivedAmount,
    acceptanceRate
  }
}
