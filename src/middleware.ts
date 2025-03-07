import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUserId } from './app/lib/session';
import { getUserById } from './db/queries/select';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const hasSession = request.cookies.has("session");
  const isLogin = request.nextUrl.pathname.startsWith('/login');
  const isRegister = request.nextUrl.pathname.startsWith('/register');
  const isOffer = request.nextUrl.pathname.startsWith('/offer');
  const isProfile = request.nextUrl.pathname.startsWith('/profile');
  const isApplicants = request.nextUrl.pathname.startsWith('/applicants');
  console.log("Pathname", request.nextUrl.pathname);

  if (hasSession && (isLogin || isRegister)) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (!hasSession && (isOffer || isProfile || isApplicants)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const userId = await getUserId();
  const [user] = await getUserById(userId);
  if (!user.isEmployer || !user.employerCompanyId) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/profile', '/login', '/register', '/offer/:id/apply',
    '/offer/add', '/applicants'],
}
