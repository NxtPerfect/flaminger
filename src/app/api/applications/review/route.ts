import { getUserId } from "@/app/lib/session";
import { getUserById } from "@/db/queries/select";
import { updateJobAcceptedForUserIdJobId, updateJobRejectedForUserIdJobId } from "@/db/queries/update";

export async function POST(req: Request) {
  const id = await getUserId();
  if (id === -1) {
    return Response.json({}, { status: 400 });
  }

  const [userData] = await getUserById(id);
  if (!userData.isEmployer || !userData.employerCompanyId) {
    return Response.json({}, { status: 401 });
  }

  const formData = await req.formData();
  const userId = formData.get("userId");
  const jobId = formData.get("jobId");
  if (!userId || !jobId) {
    return Response.json({ errorType: "badData" }, { status: 400 });
  }

  const parsedUserId = Number.parseInt(userId.toString());
  const parsedJobId = Number.parseInt(jobId.toString());
  switch (formData.get("status")?.toString()) {
    case "accepted":
      await updateJobAcceptedForUserIdJobId(parsedUserId, parsedJobId);
      break;
    case "rejected":
      const rejectionReason = formData.get("rejectionReason")?.toString();
      if (!rejectionReason) {
        return Response.json({ errorType: "badData" }, { status: 400 });
      }
      await updateJobRejectedForUserIdJobId(parsedUserId, parsedJobId, rejectionReason);
      break;
    default:
      return Response.json({ errorType: "badData" }, { status: 400 });
  }

  return Response.json({}, { status: 200 });
}
