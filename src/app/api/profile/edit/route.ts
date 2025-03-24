import { getUserId } from "@/app/lib/session";
import { updateUser } from "@/db/queries/update";
import { InsertHumanLanguagesToUsers, InsertTechnologiesToUsers } from "@/db/schema";

export async function PUT(req: Request) {
  const userId = await getUserId();
  if (userId === -1) {
    return Response.json({ errorType: "unauthorized" }, { status: 401 });
  }
  const formData = await req.formData();

  const user = getUserFromFormData(formData, userId);

  const technologies = getTechnologiesFromFormData(formData, user.id);

  const humanLanguages = getHumanLanguagesFromFormData(formData, user.id);

  try {
    await updateUser(
      user,
      technologies,
      humanLanguages
    );
  } catch (error) {
    console.error(error);
    return Response.json({ errorType: "emptyFields" }, { status: 400 })
  }

  return Response.json({ status: 200 });
}

function getUserFromFormData(formData: FormData, userId: number) {
  const firstname = formData.get("firstname");
  const surname = formData.get("surname");
  const city = formData.get("city");
  return {
    id: userId,
    firstname: firstname?.toString() ?? "",
    surname: surname?.toString() ?? "",
    city: city?.toString() ?? ""
  };
}

function getTechnologiesFromFormData(formData: FormData, userId: number) {
  const nameTechnologies = formData.getAll("name");
  const experienceTechnologies = formData.getAll("experience");
  const technologies = combineTechnologiesFromNamesAndExperiences(nameTechnologies, experienceTechnologies, userId);
  return technologies;
}

function getHumanLanguagesFromFormData(formData: FormData, userId: number) {
  const nameHumanLanguages = formData.getAll("language");
  const levelHumanLanguages = formData.getAll("level");
  const humanLanguages = combineHumanLanguagesFromNamesAndLevels(nameHumanLanguages, levelHumanLanguages, userId);
  return humanLanguages;
}

function combineTechnologiesFromNamesAndExperiences(nameTechnologies: FormDataEntryValue[], experienceTechnologies: FormDataEntryValue[], userId: number) {
  const technologies = [];
  for (let i = 0; i < Math.min(nameTechnologies.length, experienceTechnologies.length); i++) {
    const technology: InsertTechnologiesToUsers = {
      name: nameTechnologies[i].toString(),
      experience: experienceTechnologies[i].toString() ?? "0",
      userId: userId
    };
    technologies.push(technology);
  }
  return technologies;
}

function combineHumanLanguagesFromNamesAndLevels(nameHumanLanguages: FormDataEntryValue[], levelHumanLanguages: FormDataEntryValue[], userId: number) {
  const humanLanguages = [];
  for (let i = 0; i < Math.min(nameHumanLanguages.length, levelHumanLanguages.length); i++) {
    const humanLanguage: InsertHumanLanguagesToUsers = {
      name: nameHumanLanguages[i].toString(),
      level: levelHumanLanguages[i].toString() ?? "A1",
      userId: userId
    }
    humanLanguages.push(humanLanguage);
  }
  return humanLanguages;

}
