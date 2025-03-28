import { getAllCities } from "@/db/queries/select";

export async function GET() {
  const city = (await getAllCities()).map((c) => c.city);

  return Response.json({ cities: city }, { status: 200 });
}
