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

export async function GET(req: Request, { params }: { params: Promise<{ offset: string, filters: string[] }> }) {
  // get name, city etc from params
  // send sql query with all the filters
  // i can make multiple queries, all filtering on specific thing
  // and chain them together
  // then get offset * 20
  //
  // const userId: number = await getUserId();
  const { offset, ...filters } = await params;
  console.log(filters);
  //
  // if (!offset) {
  //   return Response.json({ errorType: "badData" }, { status: 400 });
  // }
  //
  // const parsedOffset = Number.parseInt(offset[0]) - 1;
  //
  // let offers;
  // if (userId !== -1) {
  //   offers = await getAllJobsForLoggedUserWithCompanyInfo(userId, parsedOffset);
  // }
  // else {
  //   offers = await getAllJobsWithCompanyInfo(parsedOffset);
  // }
  //
  // const tech = await getTechnologiesForMax20jobs(parsedOffset);
  // const lang = await getHumanLanguagesForMax20jobs(parsedOffset);
  // const uniqueIds = getUniqueIdsFromTechAndLang(tech, lang)
  //
  // const combinedTech = combineTechnologiesOfSameJobId(tech, uniqueIds);
  // const combinedLang = combineHumanLanguagesOfSameJobId(lang, uniqueIds);
  //
  // if (offers.length > 0 && (combinedTech.length === 0 || combinedLang.length === 0)) {
  //   return Response.json({ errorType: "serverError" }, { status: 500 })
  // }
  //
  // return Response.json({
  //   offers,
  //   tech: combinedTech ?? [],
  //   langs: combinedLang ?? []
  // },
  //   { status: 200 }
  // );
  return Response.json({ status: 200 });
}

function getOffset(url: string) {
  return url.split('/')[5].split('/')[0];
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
    const arr = tech.filter((t) =>
      t.jobId === uniqueIds[i]
    )
      .map((t) => {
        return {
          name: t.name,
          experience: t.experience
        }
      });

    combinedTech.push({
      jobId: uniqueIds[i],
      tech: arr
    });
  }

  return combinedTech;
}

function combineHumanLanguagesOfSameJobId(lang: langReturnData[], uniqueIds: number[]) {
  const combinedLang = [];
  for (let i = 0; i < uniqueIds.length; i++) {
    const arr = lang.filter((l) =>
      l.jobId === uniqueIds[i]
    )
      .map((l) => {
        return { name: l.name, level: l.level };
      })
    combinedLang.push({
      jobId: uniqueIds[i],
      langs: arr
    });
  }
  return combinedLang;
}
