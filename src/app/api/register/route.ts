import { createSession } from "@/app/lib/session";
import { isValidEmail, isValidFirstName, isValidPassword, isValidSurName } from "@/app/lib/validation";
import { createUser } from "@/db/queries/insert";
import { getUserByEmail } from "@/db/queries/select";
import { hash } from "bcryptjs";

type UserFormData = {
  id?: number
  firstname?: string
  surname?: string
  email?: string
  password?: string
  confirmPassword?: string
  dataConsent?: string
  mailingConsent?: string
}

export async function POST(req: Request) {
  const formData = await req.formData();

  const userData: UserFormData = getUserDataFromForm(formData);

  if (!isValidUser(userData))
    return Response.json({ errorType: "emptyFields" }, { status: 400 });

  if (!confirmPasswordMatches(userData))
    return Response.json({ errorType: "passwords" }, { status: 400 });

  if (!isValidUserData(userData) || !isValidPassword(userData.password!.toString())) {
    return Response.json({ errorType: "badData" }, { status: 400 });
  }

  if (!userData.dataConsent) {
    return Response.json({ errorType: "dataConsent" }, { status: 400 });
  }

  const hashedUserPassword = await hash(userData.password!.toString(), 12);
  try {
    await createUser({
      email: userData.email!.toString(),
      firstname: userData.firstname!.toString(),
      surname: userData.surname!.toString(),
      password: hashedUserPassword.toString(),
      mailingConsent: userData.mailingConsent !== undefined,
      isEmployer: false,
      employerCompanyId: 1
    });

    const [user] = await getUserByEmail(userData.email!.toString());
    await createSession(user.id.toString(), user.isEmployer);
    return Response.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ errorType: "userExists" }, { status: 400 });
  }
}

function isValidUserData(userData: UserFormData) {
  return (
    isValidEmail(userData.email!.toString()) ||
    isValidFirstName(userData.firstname!.toString()) ||
    isValidSurName(userData.surname!.toString())
  );
}

function getUserDataFromForm(formData: FormData) {
  const email = formData.get("email")?.toString();
  const firstname = formData.get("firstname")?.toString();
  const surname = formData.get("surname")?.toString();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();
  const dataConsent = formData.get("dataConsent")?.toString();
  const mailingConsent = formData.get("mailingConsent")?.toString();
  return { email, firstname, surname, password, confirmPassword, dataConsent, mailingConsent }
}

function isValidUser(userData: UserFormData) {
  return userData.email && userData.firstname && userData.surname && userData.password && userData.confirmPassword && userData.dataConsent;
}

function confirmPasswordMatches(userData: UserFormData) {
  return userData.password === userData.confirmPassword;
}
