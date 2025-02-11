import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const hasSession = request.cookies.has("session");
  const isLogin = request.nextUrl.pathname.startsWith('/login');
  const isRegister = request.nextUrl.pathname.startsWith('/register');
  const isOffer = request.nextUrl.pathname.startsWith('/offer');
  const isProfile = request.nextUrl.pathname.startsWith('/profile');

  if (hasSession && (isLogin || isRegister)) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (!hasSession && (isOffer || isProfile)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/profile', '/login', '/register', '/offer/:id/apply'],
}
