import { getUserId } from "@/app/lib/session"
import { createJobToUser } from "@/db/queries/insert"
import { getJobById } from "@/db/queries/select";

export async function PUT(req: Request) {
  const formData = await req.formData();
  const userId = await getUserId();

  const jobId = formData.get("jobId")?.toString();

  if (!jobId) {
    return Response.json({ error: "badData" }, { status: 400 });
  }

  const parsedJobId = Number.parseInt(jobId);

  const [job] = await getJobById(parsedJobId);

  if (job.isClosed) {
    return Response.json({ error: "badData" }, { status: 400 });
  }

  try {
    await createJobToUser({
      userId: userId,
      jobId: parsedJobId,
      isApplied: true,
      isApplicationInProgress: true,
      isAccepted: false,
      rejectionReason: ""
    });

    return Response.json({ status: 200 });
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }
}
