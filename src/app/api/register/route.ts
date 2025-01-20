export async function POST(req: Request) {
  let data = await req.formData();

  const email = data.get("email");
  const firstname = data.get("firstname");
  const surname = data.get("surname");
  const password = data.get("password");
  const confirmPassword = data.get("confirmPassword");
  const dataConsent = data.get("dataConsent");
  const mailingConsent = data.get("mailingConsent");
  // const id = req.query["id"];
  // const auth = req.cookies.authorization
  // res.setHeader('Set-Cookie', 'username=lee; Path=/; HttpOnly')
  // res.status(200).send('Cookie has been set.')
  // res.setHeader('Set-Cookie', 'username=; Path=/; HttpOnly; Max-Age=0')
  // res.status(200).send('Cookie has been deleted.')
  // res.redirect(307, `/post/${id}`)
  // return res.json();
  return Response.json({ status: "success" });
}

export async function GET(req: Request) {
  return Response.json({ status: "success" });
}
