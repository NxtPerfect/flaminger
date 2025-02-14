import { HumanLanguage, Technology } from "@/app/lib/definitions";
import { getUserId } from "@/app/lib/session";

export async function PUT(req: Request) {
  const userId = await getUserId();
  if (userId === -1) {
    return Response.json({ errorType: "unauthorized" }, { status: 401 });
  }
  const formData = await req.formData();
  // Check if all data is valid
  const firstname = formData.get("firstname");
  const surname = formData.get("surname");
  const city = formData.get("city");
  const nameTechnologies = formData.getAll("name");
  const experienceTechnologies = formData.getAll("experience");
  const technologies = [];
  for (let i = 0; i < Math.min(nameTechnologies.length, experienceTechnologies.length); i++) {
    const technology: Technology = {
      name: nameTechnologies[i].toString(),
      experience: Number.parseInt(experienceTechnologies[i].toString()) ?? 0,
    };
    technologies.push(technology);
  }

  const nameHumanLanguages = formData.getAll("language");
  const levelHumanLanguages = formData.getAll("level");
  const humanLanguages = [];
  for (let i = 0; i < Math.min(nameHumanLanguages.length, levelHumanLanguages.length); i++) {
    const humanLanguage = {
      name: nameHumanLanguages[i].toString(),
      level: levelHumanLanguages[i].toString()
    }
    humanLanguages.push(humanLanguage);
  }
  try {
    await updateUser();
  } catch (error) {
    return Response.json({ errorType: "emptyFields" }, { status: 400 })
  }

  // Change user data
  return Response.json({ status: 200 });
}
