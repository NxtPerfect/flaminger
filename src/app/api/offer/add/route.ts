export async function PUT(req: Request) {
  const formData = await req.formData();
  console.log(formData);

  try {
    return Response.json({ status: 200 });
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }
}
