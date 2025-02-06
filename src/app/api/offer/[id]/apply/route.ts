import { getUserId } from "@/app/lib/session"
import { createJobToUser } from "@/db/queries/insert"

export async function PUT(req: Request) {
  const formData = await req.formData();
  const userId = await getUserId();

  try {
    await createJobToUser({
      userId: userId,
      jobId: Number.parseInt(formData.get("jobId")!.toString()),
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
