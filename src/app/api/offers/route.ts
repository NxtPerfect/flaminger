import { getUsersId } from "@/app/lib/session";
import { Company } from "@/components/JobList";
import { getAllJobsWithCompanyInfo, getCompanyById } from "@/db/queries/select"

export async function GET() {
  if (await getUsersId() !== -1) {
    console.log("Logged in fr");
  }
  console.log("not logged in fr");


  const offers = await getAllJobsWithCompanyInfo();
  console.log(offers);
  return Response.json({ offers: offers }, { status: 200 })

  // try {
  //   const companiesPromises = offers.map((offer, id) => {
  //     getCompanyById(offer.byCompanyId);
  //   });
  //   console.log(companiesPromises);
  //   const companies = await Promise.all(companiesPromises);
  //   console.log(companies);
  //   return Response.json({ offers: offers, companies: companies }, { status: 200 })
  // } catch (e) {
  //   console.log(e);
  // }
}
