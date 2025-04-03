import { getUserId } from "@/app/lib/session";
import { getApplicationsByCompanyId, getHumanLanguagesByUserId, getHumanLanguagesForAllJobs, getTechnologiesByUserId, getTechnologiesForAllJobs, getUserById } from "@/db/queries/select";

export async function POST() {
  const id = await getUserId();
  if (id === -1) {
    return Response.json({}, { status: 400 });
  }

  const [userData] = await getUserById(id);
  if (!userData.isEmployer || !userData.employerCompanyId) {
    return Response.json({}, { status: 401 });
  }

  let applications = await getApplicationsByCompanyId(userData.employerCompanyId);
  const usersIds: number[] = applications
    .map((application) => application.jobs_to_users_table.userId)
    .filter((application, index, arr) => arr.indexOf(application) === index);

  for (let i = 0; i < usersIds.length; i++) {
    const technologies = await getTechnologiesByUserId(usersIds[i]);
    const humanLanguages = await getHumanLanguagesByUserId(usersIds[i]);
    const [user] = await getUserById(usersIds[i]);
    applications = applications.map((app) => {
      if (app.jobs_to_users_table.userId === usersIds[i]) {
        return { ...app, technologies: technologies, human_languages: humanLanguages, user: user };
      }
      return { ...app };
    })
  }

  const tech = await getTechnologiesForAllJobs();
  const langs = await getHumanLanguagesForAllJobs();
  return Response.json({ data: applications, tech: tech, langs: langs }, { status: 200 });
}
