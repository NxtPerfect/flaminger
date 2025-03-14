import { getUserId } from "@/app/lib/session";
import { getHumanLanguagesByUserId, getTechnologiesByUserId } from "@/db/queries/select";

export async function GET() {
  const userId = await getUserId();
  if (userId === -1) {
    return Response.json({ status: 403 })
  }

  const technologies = await getTechnologiesByUserId(userId);
  const humanLanguages = await getHumanLanguagesByUserId(userId);

  return Response.json({
    technologies: technologies ?? [],
    humanLanguages: humanLanguages ?? []
  },
    {
      status: 200
    });
}
