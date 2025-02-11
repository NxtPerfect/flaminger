"use server";
import 'server-only';
import { jwtVerify, SignJWT } from 'jose';
import { SessionPayload } from './definitions';
import { cookies } from 'next/headers';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function signToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function verifySession(session: string = '') {
  if (!session) {
    const cookieStore = await cookies();
    session = cookieStore.get('session')?.value ?? '';
  }

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload;
  } catch (error) {
    console.error('Failed to verify session.', error);
  }
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await signToken({ userId, expiresAt })
  const cookieStore = await cookies()

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function endSession() {
  const cookieStore = await cookies()

  cookieStore.set('session', "", {
    expires: 0,
    sameSite: 'lax',
    path: '/',
  })
}

export async function getUserId(): Promise<number> {
  const cookieStore = await cookies();

  const session = cookieStore.get('session')?.value;
  if (!session)
    return -1;
  const payload = await verifySession(session);
  if (typeof payload?.userId === "string")
    return Number.parseInt(payload.userId);
  return -1
}
