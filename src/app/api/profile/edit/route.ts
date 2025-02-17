import { getUserId } from "@/app/lib/session";
import { updateUser } from "@/db/queries/update";
import { InsertHumanLanguagesToUsers, InsertTechnologiesToUsers } from "@/db/schema";

export async function PUT(req: Request) {
  const userId = await getUserId();
  if (userId === -1) {
    return Response.json({ errorType: "unauthorized" }, { status: 401 });
  }
  const formData = await req.formData();

  const firstname = formData.get("firstname");
  const surname = formData.get("surname");
  const city = formData.get("city");

  const nameTechnologies = formData.getAll("name");
  const experienceTechnologies = formData.getAll("experience");
  const technologies = [];
  for (let i = 0; i < Math.min(nameTechnologies.length, experienceTechnologies.length); i++) {
    const technology: InsertTechnologiesToUsers = {
      name: nameTechnologies[i].toString(),
      experience: experienceTechnologies[i].toString() ?? "0",
      userId: userId
    };
    technologies.push(technology);
  }

  const nameHumanLanguages = formData.getAll("language");
  const levelHumanLanguages = formData.getAll("level");
  const humanLanguages = [];
  for (let i = 0; i < Math.min(nameHumanLanguages.length, levelHumanLanguages.length); i++) {
    const humanLanguage: InsertHumanLanguagesToUsers = {
      name: nameHumanLanguages[i].toString(),
      level: levelHumanLanguages[i].toString() ?? "A1",
      userId: userId
    }
    humanLanguages.push(humanLanguage);
  }

  try {
    await updateUser({
      id: userId,
      firstname: firstname!.toString(),
      surname: surname!.toString(),
      city: city!.toString()
    },
      technologies,
      humanLanguages);
  } catch (error) {
    console.log(error);
    return Response.json({ errorType: "emptyFields" }, { status: 400 })
  }

  return Response.json({ status: 200 });
}
