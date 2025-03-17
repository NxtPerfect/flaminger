import { getUserId } from "@/app/lib/session";
import { getApplicationsByCompanyId, getCompanyById, getJobsByCompanyId, getUserById } from "@/db/queries/select";

export async function POST() {
  const id = await getUserId();
  if (id === -1) {
    return Response.json({ status: 400 });
  }

  const [userData] = await getUserById(id);

  if (!userData.isEmployer || !userData.employerCompanyId) {
    return Response.json({ status: 403 });
  }

  const [company] = await getCompanyById(userData.employerCompanyId ?? -1);
  const jobOffersPosted = await getJobsByCompanyId(userData.employerCompanyId);
  const applicationsAmount = await getApplicationsByCompanyId(userData.employerCompanyId);

  return Response.json({
    name: company.name,
    acceptanceRate: company.acceptanceRate,
    jobOffersPosted,
    applicationsAmount
  }, { status: 200 });
}
