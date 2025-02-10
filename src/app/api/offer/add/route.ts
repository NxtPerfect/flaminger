import { RequiredTechnology } from "@/app/lib/definitions";
// import { verifySession } from "@/app/lib/session";

export async function PUT(req: Request) {
  const formData = await req.formData();
  // Verify if user is employer
  // verifySession()
  const offerData = parseOfferData(formData);

  try {
    return Response.json({ data: offerData }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }
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
  const namesOfRequiredTechnologies = formData.getAll("nameOfTechnology");
  const minimumYearsOfRequiredTechnologies = formData.getAll("minimumYearOfTechnology");

  // Check if any value is not a valid string
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
    i < Math.min(namesOfRequiredTechnologies.length, minimumYearsOfRequiredTechnologies.length);
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
