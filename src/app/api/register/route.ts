import { createSession } from "@/app/lib/session";
import { isValidEmail, isValidFirstName, isValidPassword, isValidSurName } from "@/app/lib/validation";
import { createUser } from "@/db/queries/insert";
import { getUserByEmail } from "@/db/queries/select";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  const formData = await req.formData();

  const userData = getUserDataFromForm(formData);

  if (!userData.email || !userData.firstname || !userData.surname || !userData.password || !userData.confirmPassword || !userData.dataConsent) {
    return Response.json({ errorType: "emptyFields" }, { status: 400 });
  }

  if (userData.password !== userData.confirmPassword) {
    return Response.json({ errorType: "passwords" }, { status: 400 });
  }

  if (!isValidUserData(userData.email, userData.firstname, userData.surname) || !isValidPassword(userData.password.toString())) {
    return Response.json({ errorType: "badData" }, { status: 400 });
  }

  if (!userData.dataConsent) {
    return Response.json({ errorType: "dataConsent" }, { status: 400 });
  }

  const hashedUserPassword = await hash(userData.password!.toString(), 12);
  try {
    await createUser({ email: userData.email!.toString(), firstname: userData.firstname!.toString(), surname: userData.surname!.toString(), password: hashedUserPassword!.toString(), mailingConsent: userData.mailingConsent != null, isEmployer: false, employerCompanyId: 1 });
  } catch (error) {
    console.error(error);
    return Response.json({ errorType: "userExists" }, { status: 400 });
  }

  const [user] = await getUserByEmail(userData.email.toString());
  await createSession(user.id.toString());
  return Response.json({ userId: user.id }, { status: 200 });
}

function isValidUserData(email: FormDataEntryValue, firstname: FormDataEntryValue, surname: FormDataEntryValue) {
  return isValidEmail(email.toString()) || isValidFirstName(firstname.toString()) || isValidSurName(surname.toString());
}

function getUserDataFromForm(formData: FormData) {
  const email = formData.get("email");
  const firstname = formData.get("firstname");
  const surname = formData.get("surname");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const dataConsent = formData.get("dataConsent");
  const mailingConsent = formData.get("mailingConsent");
  return { email, firstname, surname, password, confirmPassword, dataConsent, mailingConsent }
}
