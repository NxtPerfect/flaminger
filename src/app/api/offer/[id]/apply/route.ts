import { randomInt } from "crypto"

type UserApplicationData = {
  firstname: string
  surname: string
  location: string
  expectedPay: number
  overallTotalExperience: number
  curriculumVitae: File
  answersToQuestions?: string[]
}

export default async function POST(req: Request, res: Response) {
  const rejected = randomInt(1);
  if (rejected) return Response.json({ status: 400 })
  return Response.json({ status: 200 })

  // In future
  // // On the frontend you'd do <input name="answers[1]"> etc
  // // get offer id
  // // get user data
  // // like cv, answers to questions
  // // return appropriate html status code
  // // 200 = applied
  // // 400 = issue with user's application
  // const formData = await req.formData();
  // const userData: UserApplicationData = {
  //   firstname: formData.get("firstname")!.toString().trim(),
  //   surname: formData.get("surname")!.toString().trim(),
  //   location: formData.get("location")!.toString().trim(),
  //   expectedPay: Number.parseInt(formData.get("expectedPay")!.toString().trim()),
  //   overallTotalExperience: Number.parseInt(formData.get("overallTotalExperience")!.toString().trim()),
  //   // curriculumVitae: formData.get("curriculumVitae"),
  //   // How to get file from upload input thing?
  //   answersToQuestions: Array<string>(),
  // }
  //
  // let i = 1;
  // while (formData.get(`answers[${i}]`)) {
  //   const answer = formData.get(`answers[${i}]`);
  //   userData.answersToQuestions!.push(answer!.toString());
  //   i++;
  // }
}
