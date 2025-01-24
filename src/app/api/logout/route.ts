import { endSession } from "@/app/lib/session";

export async function POST() {
  await endSession();
  console.log("Cleared session")
}
