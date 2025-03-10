import { getUserId } from "@/app/lib/session";
import { getAllJobsForLoggedUserWithCompanyInfo, getAllJobsWithCompanyInfo, getHumanLanguagesForMax20jobs, getTechnologiesForMax20jobs } from "@/db/queries/select"

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

export async function GET(req: Request) {
  const userId: number = await getUserId();
  const offset = req.url.split('/')[5];
  if (!offset) {
    return Response.json({ errorType: "badData" }, { status: 400 });
  }

  const parsedOffset = Number.parseInt(offset[0]) - 1;

  let offers;
  if (userId !== -1) {
    offers = await getAllJobsForLoggedUserWithCompanyInfo(userId, parsedOffset);
  }
  else {
    offers = await getAllJobsWithCompanyInfo(parsedOffset);
  }

  const tech = await getTechnologiesForMax20jobs(parsedOffset);
  const lang = await getHumanLanguagesForMax20jobs(parsedOffset);
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
  const combinedTech = [];
  for (let i = 0; i < uniqueIds.length; i++) {
    const arr = tech.map((t) => {
      if (t.jobId === uniqueIds[i]) {
        return { name: t.name, experience: t.experience };
      }
    })
    if (arr.length > 0)
      combinedTech.push({ jobId: uniqueIds[i], tech: arr });
  }

  return combinedTech;
}

function combineHumanLanguagesOfSameJobId(lang: langReturnData[], uniqueIds: number[]) {
  const combinedLang = [];
  for (let i = 0; i < uniqueIds.length; i++) {
    const arr = lang.map((l) => {
      if (l.jobId === uniqueIds[i]) {
        return { name: l.name, level: l.level };
      }
    })
    if (arr.length === 0)
      continue;
    combinedLang.push({ jobId: uniqueIds[i], langs: arr });
  }
  return combinedLang;
}
