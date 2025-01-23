import { createUser } from "@/db/queries/insert";
import { getUserByEmail } from "@/db/queries/select";
import { hash, compareSync } from "bcryptjs";

const MINIMUM_PASSWORD_LENGTH = 8;

export async function POST(req: Request, res: Response) {
  let data = await req.formData();

  const email = data.get("email");
  const firstname = data.get("firstname");
  const surname = data.get("surname");
  const password = data.get("password");
  const confirmPassword = data.get("confirmPassword");
  const dataConsent = data.get("dataConsent");
  const mailingConsent = data.get("mailingConsent");

  if (!email || !firstname || !surname || !password || !confirmPassword || !dataConsent) {
    return Response.json({ errorType: "emptyFields" }, { status: 400 });
  }

  if (password !== confirmPassword) {
    return Response.json({ errorType: "passwords" }, { status: 400 });
  }

  if (!isValidUserData(email, firstname, surname) || !isValidPassword(password)) {
    return Response.json({ errorType: "badData" }, { status: 400 });
  }

  if (!dataConsent) {
    return Response.json({ errorType: "dataConsent" }, { status: 400 });
  }

  const hashedUserPassword = await hash(password!.toString(), 12);
  createUser({ email: email!.toString(), firstname: firstname!.toString(), surname: surname!.toString(), password: hashedUserPassword!.toString(), mailingConsent: mailingConsent != null });

  const user = await getUserByEmail(email.toString());
  return Response.json({ userId: user.id }, { status: 200 });
}

function isValidUserData(email: FormDataEntryValue, firstname: FormDataEntryValue, surname: FormDataEntryValue) {
  return isValidEmail(email.toString()) || isValidFirstName(firstname.toString()) || isValidSurName(surname.toString());
}

function isValidEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  console.log(re.test(email));
  return re.test(email);
}

function isValidFirstName(name: string) {
  const re = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
  console.log(re.test(name));
  return re.test(name);
}

function isValidSurName(name: string) {
  const re = /^(?=.{1,75}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
  console.log(re.test(name));
  return re.test(name);
}

function isValidPassword(password: FormDataEntryValue) {
  const re = /^(?=.{1,64}$)[a-z0-9]+$/i;
  const passwordString = password.toString();
  console.log(passwordString);
  console.log(re.test(passwordString), passwordString.length);
  return passwordString.length >= MINIMUM_PASSWORD_LENGTH && re.test(passwordString);
}
