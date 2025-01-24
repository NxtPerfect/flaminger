import { createSession } from "@/app/lib/session";
import { isValidEmail, isValidPassword } from "@/app/lib/validation";
import { getUserByEmail } from "@/db/queries/select";
import { compare, hash } from "bcryptjs";

export async function POST(req: Request, res: Response) {
  const formData = await req.formData();
  if (!formData.get("email") || !formData.get("password")) {
    return Response.json({ errorType: "emptyFields" }, { status: 400 });
  }
  if (!isValidPassword(formData.get("password")!.toString()!) || !isValidEmail(formData.get("email")!.toString()!)) {
    return Response.json({ errorType: "badData" }, { status: 400 });
  }

  const hashedPassword = await hash(formData.get("password")!.toString(), 12);
  const userData = await getUserByEmail(formData.get("email")!.toString());
  if (!compare(hashedPassword, userData[0].password)) {
    return Response.json({ errorType: "badData" }, { status: 400 });
  }

  await createSession(userData[0].id.toString());
  return Response.json({ status: 200 });
}
