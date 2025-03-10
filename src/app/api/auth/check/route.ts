import { ROLE_VARIANTS, ROLES } from "@/app/lib/definitions";
import { getIsUserEmployer, verifySession } from "@/app/lib/session";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session)
    return {
      isLoggedIn: false,
      role: ROLES[ROLE_VARIANTS.guest]
    };

  if (!session.value)
    return {
      isLoggedIn: false,
      role: ROLES[ROLE_VARIANTS.guest]
    };

  const isVerified = await verifySession();
  const isEmployer = await getIsUserEmployer();

  return {
    isLoggedIn: isVerified ? true : false,
    role: isEmployer ?
      ROLES[ROLE_VARIANTS.employer] :
      ROLES[ROLE_VARIANTS.user]
  };
}
