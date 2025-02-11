import { createSession } from "@/app/lib/session";
import { isValidEmail, isValidPassword } from "@/app/lib/validation";
import { getUserByEmail } from "@/db/queries/select";
import { compare } from "bcryptjs";

export async function POST(req: Request) {
  const formData = await req.formData();

  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString().trim();
  if (!email || !password) {
    return Response.json({ errorType: "emptyFields" }, { status: 400 });
  }
  if (!isValidPassword(password) || !isValidEmail(email)) {
    return Response.json({ errorType: "badData" }, { status: 400 });
  }

  const [userData] = await getUserByEmail(email);
  if (!userData) {
    return Response.json({ errorType: "badData" }, { status: 400 });
  }

  const arePasswordsSame = await compare(password, userData.password)
  if (!arePasswordsSame) {
    return Response.json({ errorType: "badData" }, { status: 400 });
  }

  await createSession(userData.id.toString(), userData.isEmployer);
  return Response.json({ status: 200 });
}
