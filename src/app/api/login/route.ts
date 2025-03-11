import { ERROR_VARIANTS } from "@/app/lib/definitions";
import { createSession, getIsUserEmployer } from "@/app/lib/session";
import { isValidEmail, isValidPassword } from "@/app/lib/validation";
import { getUserByEmail } from "@/db/queries/select";
import { compare } from "bcryptjs";

export async function POST(req: Request) {
  const formData = await req.formData();

  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString().trim();
  if (!email || !password) {
    return Response.json({ errorType: ERROR_VARIANTS.EMPTY_FIELDS }, { status: 400 });
  }
  if (!isValidPassword(password) || !isValidEmail(email)) {
    return Response.json({ errorType: ERROR_VARIANTS.BAD_DATA }, { status: 400 });
  }

  const [userData] = await getUserByEmail(email);
  if (!userData) {
    return Response.json({ errorType: ERROR_VARIANTS.BAD_DATA }, { status: 400 });
  }

  const arePasswordsSame = await compare(password, userData.password)
  if (!arePasswordsSame) {
    return Response.json({ errorType: ERROR_VARIANTS.BAD_DATA }, { status: 400 });
  }

  await createSession(userData.id.toString(), userData.isEmployer);
  const isEmployer = await getIsUserEmployer();
  return Response.json({ role: isEmployer ? "employer" : "user" },
    { status: 200 });
}
