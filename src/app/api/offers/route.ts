import { getUserId } from "@/app/lib/session";
import { getAllJobsForLoggedUserWithCompanyInfo, getAllJobsWithCompanyInfo, getHumanLanguagesForAllJobs, getTechnologiesForAllJobs } from "@/db/queries/select"

type techReturnData = {
  jobId: number,
  name: string,
  experience: string
}

type langReturnData = {
  jobId: number,
  name: string,
  level: string
}

export async function GET() {
  const userId: number = await getUserId();
  let offers;
  if (userId !== -1) {
    offers = await getAllJobsForLoggedUserWithCompanyInfo(userId);
  }
  else {
    offers = await getAllJobsWithCompanyInfo();
  }

  const tech = await getTechnologiesForAllJobs();
  const lang = await getHumanLanguagesForAllJobs();
  const uniqueIds = getUniqueIdsFromTechAndLang(tech, lang)

  const combinedTech = combineTechnologiesOfSameJobId(tech, uniqueIds);
  const combinedLang = combineHumanLanguagesOfSameJobId(lang, uniqueIds);

  if (offers.length > 0 && (combinedTech.length === 0 || combinedLang.length === 0)) {
    return Response.json({ errorType: "serverError" }, { status: 500 })
  }

  return Response.json({ offers: offers, tech: combinedTech ?? [], langs: combinedLang ?? [] }, { status: 200 })
}

function getUniqueIdsFromTechAndLang(tech: techReturnData[], lang: langReturnData[]) {
  const uniqueIds: number[] = [];
  for (let i = 0; i < tech.length; i++) {
    if (!uniqueIds.some((id) => tech[i].jobId === id)) {
      uniqueIds.push(tech[i].jobId);
    }
  }

  for (let i = 0; i < lang.length; i++) {
    if (!uniqueIds.some((id) => lang[i].jobId === id)) {
      uniqueIds.push(lang[i].jobId);
    }
  }
  return uniqueIds;
}

function combineTechnologiesOfSameJobId(tech: techReturnData[], uniqueIds: number[]) {
  const combinedTech: { jobId: number, tech: { name: string, experience: string }[] }[] = [];
  for (let i = 0; i < uniqueIds.length; i++) {
    const arr: { name: string, experience: string }[] = tech.map((t) => {
      if (t.jobId === uniqueIds[i]) {
        return { name: t.name, experience: t.experience };
      }
    })
    combinedTech.push({ jobId: uniqueIds[i], tech: arr });
  }

  return combinedTech;
}

function combineHumanLanguagesOfSameJobId(lang: langReturnData[], uniqueIds: number[]) {
  const combinedLang: { jobId: number, langs: { name: string, level: string }[] }[] = [];
  for (let i = 0; i < uniqueIds.length; i++) {
    const arr: { name: string, level: string }[] = lang.map((l) => {
      if (l.jobId === uniqueIds[i]) {
        return { name: l.name, level: l.level };
      }
    })
    combinedLang.push({ jobId: uniqueIds[i], langs: arr });
  }
  return combinedLang;
}
