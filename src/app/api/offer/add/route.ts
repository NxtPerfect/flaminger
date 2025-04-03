import { HUMAN_LANGUAGE_LEVELS, HumanLanguage, Technology } from "@/app/lib/definitions";
import { getUserId } from "@/app/lib/session";
import { createJob } from "@/db/queries/insert";
import { getUserById } from "@/db/queries/select";

export async function PUT(req: Request) {
  const formData = await req.formData();
  const offerData = parseOfferData(formData);

  const userId = await getUserId();
  const [userData] = await getUserById(userId);
  if (userData.isEmployer === false) {
    return Response.json({}, { status: 401 });
  }
  const companyId = userData.employerCompanyId;

  if (!companyId) {
    return Response.json({ error: "badData" }, { status: 400 });
  }

  try {
    await createJob({
      title: offerData.title,
      description: offerData.description,
      byCompanyId: companyId,
      isClosed: false
    },
      offerData.technologies,
      offerData.humanLanguages
    ).then(() => {
      return Response.json({ data: offerData }, { status: 200 });
    })
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }
  return Response.json({ error: "badData" }, { status: 400 });
}

function parseOfferData(formData: FormData): offerData {
  const jobData = getJobFromFormData(formData);

  if (isAnyNull(jobData))
    return {} as offerData;

  const parsedTechnologies: Technology[] = getTechnologyFromFormData(formData);

  const parsedHumanLanguages: HumanLanguage[] = getHumanLanguagesFromFormData(formData);

  return {
    ...jobData,
    technologies: parsedTechnologies,
    humanLanguages: parsedHumanLanguages
  }
}

function getJobFromFormData(formData: FormData): jobOfferData {
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const preParseMinSal = formData.get("minSalary")?.toString();
  const preParseMaxSal = formData.get("maxSalary")?.toString();
  if (!preParseMinSal || !preParseMaxSal) {
    return {} as offerData;
  }
  const minSalary = Number.parseInt(preParseMinSal);
  const maxSalary = Number.parseInt(preParseMaxSal);
  const city = formData.get("city")?.toString();
  const employmentType = formData.get("employmentType")?.toString();
  const contractType = formData.get("contractType")?.toString();
  const workhourType = formData.get("workhourType")?.toString();

  return { title, description, minSalary, maxSalary, city, employmentType, contractType, workhourType } as jobOfferData
}

function isAnyNull(jobData: jobOfferData) {
  const parameters = { jobData };
  for (const param in parameters) {
    if (!param) {
      return true;
    }
  }
  return false;
}

function getTechnologyFromFormData(formData: FormData) {
  const parsedTechnologies: Technology[] = [];

  const names = formData.getAll("name");
  const experience = formData.getAll("experience");

  for (
    let i = 0;
    i < names.length;
    i++) {
    parsedTechnologies.push(
      {
        name: names[i].toString(),
        experience: Number.parseInt(experience[i].toString()) ?? 0
      });
  }
  return parsedTechnologies;
}

function getHumanLanguagesFromFormData(formData: FormData) {
  const parsedHumanLanguages: HumanLanguage[] = [];

  const names = formData.getAll("language");
  const levels = formData.getAll("level");

  for (
    let i = 0;
    i < names.length;
    i++) {
    parsedHumanLanguages.push(
      {
        name: names[i].toString(),
        level: levels[i].toString().toLowerCase() in HUMAN_LANGUAGE_LEVELS ?
          levels[i].toString().toLowerCase() : "A1"
      });
  }
  return parsedHumanLanguages;
}

type offerData = {
  title: string
  description: string
  minSalary: number
  maxSalary: number
  city: string
  employmentType: string
  contractType: string
  workhourType: string
  technologies: Technology[]
  humanLanguages: HumanLanguage[]
}

type jobOfferData = {
  title: string
  description: string
  minSalary: number
  maxSalary: number
  city: string
  employmentType: string
  contractType: string
  workhourType: string
}
