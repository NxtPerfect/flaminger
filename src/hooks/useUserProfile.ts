import { CompletedApplication, DatabaseCompletedApplication, HumanLanguage, Offer, PendingApplication, StatisticsForUserApplications, StatisticsForUserApplicationsFromDatabase, Technology, User } from "@/app/lib/definitions";
import { useCallback, useEffect, useState } from "react";

type UserProfile = {
  isLoading: boolean
  user: User
  statistics: StatisticsForUserApplications
  pendingApplications: Partial<Offer>[]
  completedApplications: CompletedApplication[]
  languages: HumanLanguage[]
  technologies: Technology[]
}

type ApiResponse = {
  userData: User
  statistics: StatisticsForUserApplicationsFromDatabase
  pendingApplications: PendingApplication[]
  completedApplications: DatabaseCompletedApplication[]
  humanLanguages: HumanLanguage[]
  technologies: Technology[]
}

export function useUserProfile(): UserProfile {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>({} as User);
  const [statistics, setStatistics] = useState<StatisticsForUserApplications>({} as StatisticsForUserApplications);
  const [pendingApplications, setPendingApplications] = useState<Partial<Offer>[]>([]);
  const [completedApplications, setCompletedApplications] = useState<CompletedApplication[]>([]);
  const [languages, setLanguages] = useState<HumanLanguage[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);

  const getProfile = useCallback(async () => {
    setIsLoading(true);
    await fetch('/api/profile', { method: "POST" })
      .then(async (res) => {
        const responseJson = await res.json();
        setDataFromApi(responseJson);
      }).finally(() => {
        setIsLoading(false);
      })
  }, []);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  function setDataFromApi(responseJson: ApiResponse) {
    setUserDataFromApi(responseJson.userData);
    setStatisticsFromApi(responseJson.statistics);
    setPendingApplicationsFromApi(responseJson.pendingApplications);
    setCompletedApplicationsFromApi(responseJson.completedApplications);
    setLanguagesFromApi(responseJson.humanLanguages);
    setTechnologiesFromApi(responseJson.technologies);
  }

  function setUserDataFromApi(rawUserData: User) {
    const userData: User = {
      id: rawUserData.id,
      firstname: rawUserData.firstname,
      surname: rawUserData.surname,
      password: "",
      email: "",
      mailingConsent: rawUserData.mailingConsent,
      isEmployer: rawUserData.isEmployer
    }
    setUser(userData);
  }

  function setStatisticsFromApi(rawStatistics: StatisticsForUserApplicationsFromDatabase) {
    const statisticsForUser: StatisticsForUserApplications = {
      accepted: rawStatistics.accepted.count,
      rejected: rawStatistics.rejected.count,
      total: rawStatistics.total.count,
      responseRate: ((rawStatistics.accepted.count + rawStatistics.rejected.count) / (rawStatistics.total.count) * 100).toFixed(2)
    }
    setStatistics(statisticsForUser);
  }

  function setPendingApplicationsFromApi(rawPendingApplications: PendingApplication[]) {
    for (let i = 0; i < rawPendingApplications.length; i++) {
      const singleApplication: Partial<Offer> = rawPendingApplications[i].jobsTable;
      const companyName = rawPendingApplications[i].company;
      const application: Partial<Offer> = {
        id: singleApplication.id,
        company: companyName,
        title: singleApplication.title,
        description: singleApplication.description,
        byCompanyId: singleApplication.byCompanyId,
        isClosed: false
      }
      setPendingApplications((pending) => [...pending, application]);
    }
  }

  function setCompletedApplicationsFromApi(rawCompletedApplications: DatabaseCompletedApplication[]) {
    for (let i = 0; i < rawCompletedApplications.length; i++) {
      const singleApplication: Offer = rawCompletedApplications[i].jobsTable;
      const isAccepted = rawCompletedApplications[i].isAccepted;
      const rejectionReason = rawCompletedApplications[i].rejectionReason;
      const companyName = rawCompletedApplications[i].company;
      const application: CompletedApplication = {
        id: singleApplication.id,
        company: companyName,
        title: singleApplication.title,
        description: singleApplication.description,
        byCompanyId: singleApplication.byCompanyId,
        isAccepted: isAccepted,
        rejectionReason: rejectionReason,
      };
      setCompletedApplications((completed) => [...completed, application]);
    }
  }

  function setLanguagesFromApi(rawLanguages: HumanLanguage[]) {
    for (let i = 0; i < rawLanguages.length; i++) {
      const language: HumanLanguage = {
        name: rawLanguages[i].name,
        level: rawLanguages[i].level,
      }
      setLanguages((current) => [...current, language]);
    }
  }

  function setTechnologiesFromApi(rawTechnologies: Technology[]) {
    for (let i = 0; i < rawTechnologies.length; i++) {
      const tech: Technology = {
        name: rawTechnologies[i].name,
        experience: rawTechnologies[i].experience,
      }
      setTechnologies((current) => [...current, tech]);
    }
  }

  return {
    isLoading,
    user,
    statistics,
    pendingApplications,
    completedApplications,
    languages,
    technologies
  }
}
