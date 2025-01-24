import { endSession } from "@/app/lib/session";

export async function GET() {
  endSession();
  console.log("Cleared session")
}
