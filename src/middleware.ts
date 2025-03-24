import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIsUserEmployer } from './app/lib/session';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const hasSession = request.cookies.has("session");
  const isEmployer = await getIsUserEmployer();
  const isLogin = request.nextUrl.pathname.startsWith('/login');
  const isRegister = request.nextUrl.pathname.startsWith('/register');
  const isOffer = request.nextUrl.pathname.startsWith('/offer');
  const isAddOffer = request.nextUrl.pathname.startsWith('/offer/add');
  const isProfile = request.nextUrl.pathname.startsWith('/profile');
  const isApplicants = request.nextUrl.pathname.startsWith('/applicants');
  const isUserProfileEdit = request.nextUrl.pathname.startsWith('/profile/edit');

  if (hasSession && (isLogin || isRegister)) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (!hasSession && (isOffer || isProfile || isApplicants)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  if (hasSession && isEmployer && (isOffer && !isAddOffer || isUserProfileEdit)) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/profile', '/login', '/register', '/offer/:id/apply',
    '/offer/add', '/offers/', '/applicants'],
}
