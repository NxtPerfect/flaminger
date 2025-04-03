import { endSession } from "@/app/lib/session";

export async function DELETE() {
  await endSession();
  return Response.json({}, { status: 200 });
}
