import { getUserId } from "@/app/lib/session";
import { getCompletedUserApplicationsByUserId, getPendingUserApplicationsByUserId, getStatisticsOfUserApplicationsByUserId, getUserById } from "@/db/queries/select";

export async function POST() {
  const id = await getUserId();
  if (id === -1) {
    return Response.json({ status: 400 });
  }
  const [userData] = await getUserById(id);
  const statistics = await getStatisticsOfUserApplicationsByUserId(id);
  const pendingApplications = await getPendingUserApplicationsByUserId(id);
  const completedApplications = await getCompletedUserApplicationsByUserId(id);
  return Response.json({ userData: userData, statistics: statistics, pendingApplications: pendingApplications, completedApplications: completedApplications }, { status: 200 });
}
