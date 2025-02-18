import { getUserId } from "@/app/lib/session";
import { getApplicationsByCompanyId, getUserById } from "@/db/queries/select";

export async function POST(req: Request) {
  // verify user is logged in and employer
  const id = await getUserId();
  if (id === -1) {
    return Response.json({ status: 400 });
  }
  const [userData] = await getUserById(id);
  if (!userData.isEmployer || !userData.employerCompanyId) {
    return Response.json({ status: 401 });
  }
  // get all user applications if byCompanyId matches user copmanyId
  const data = await getApplicationsByCompanyId(userData.employerCompanyId);
  // also return each candidate's profile
  return Response.json({ data: data }, { status: 200 });
}
