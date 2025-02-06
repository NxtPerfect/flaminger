import { createSession } from "@/app/lib/session";
import { isValidEmail, isValidPassword } from "@/app/lib/validation";
import { getUserByEmail } from "@/db/queries/select";
import { compare } from "bcryptjs";

export async function POST(req: Request) {
  const formData = await req.formData();
  if (!formData.get("email") || !formData.get("password")) {
    return Response.json({ errorType: "emptyFields" }, { status: 400 });
  }
  if (!isValidPassword(formData.get("password")!.toString()!) || !isValidEmail(formData.get("email")!.toString()!)) {
    return Response.json({ errorType: "badData" }, { status: 400 });
  }

  const [userData] = await getUserByEmail(formData.get("email")!.toString());
  const arePasswordsSame = await compare(formData.get("password")!.toString().trim(), userData.password)
  if (!arePasswordsSame) {
    return Response.json({ errorType: "badData" }, { status: 400 });
  }

  await createSession(userData.id.toString());
  return Response.json({ status: 200 });
}
