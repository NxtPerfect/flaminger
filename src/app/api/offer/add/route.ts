import { RequiredTechnology } from "@/app/lib/definitions";
import { getUserId } from "@/app/lib/session";
import { createJob } from "@/db/queries/insert";
import { getUserById } from "@/db/queries/select";

export async function PUT(req: Request) {
  const formData = await req.formData();
  const offerData = parseOfferData(formData);

  const userId = await getUserId();
  const [userData] = await getUserById(userId);
  if (userData.isEmployer === false) {
    return Response.json({ status: 401 });
  }
  const companyId = userData.employerCompanyId;

  try {
    await createJob({
      title: offerData.title,
      description: offerData.description,
      byCompanyId: companyId,
      isClosed: false,
    }).then(() => {
      return Response.json({ data: offerData }, { status: 200 });
    })
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }
  return Response.json({ error: "badData" }, { status: 400 });
}

function parseOfferData(formData: FormData): offerData {
  const title = formData.get("title");
  const description = formData.get("description");
  const minSalary = formData.get("minSalary");
  const maxSalary = formData.get("maxSalary");
  const city = formData.get("city");
  const employmentType = formData.get("employmentType");
  const contractType = formData.get("contractType");
  const workhourType = formData.get("workhourType");
  const namesOfRequiredTechnologies = formData.getAll("name");
  const minimumYearsOfRequiredTechnologies = formData.getAll("minimumYearsOfExperience");

  const parameters = { title, description, minSalary, maxSalary, city, employmentType, contractType, workhourType };
  for (const param in parameters) {
    if (!param) {
      return {} as offerData;
    }
  }

  // Get string of all technologies names + minimum year
  const parsedTechnologies: RequiredTechnology[] = [];
  for (
    let i = 0;
    i < namesOfRequiredTechnologies.length;
    i++) {
    parsedTechnologies.push(
      {
        name: namesOfRequiredTechnologies[i].toString(),
        minimumYearsOfExperience: Number.parseInt(minimumYearsOfRequiredTechnologies[i].toString()) ?? 0
      });
  }

  return {
    title: title!.toString(),
    description: description!.toString(),
    minSalary: Number.parseInt(minSalary!.toString()),
    maxSalary: Number.parseInt(maxSalary!.toString()),
    city: city!.toString(),
    employmentType: employmentType!.toString(),
    contractType: contractType!.toString(),
    workhourType: workhourType!.toString(),
    technologies: parsedTechnologies,
  }
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
  technologies: RequiredTechnology[]
}
