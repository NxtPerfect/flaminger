"use server";
import 'server-only';
import { jwtDecrypt, jwtVerify, SignJWT } from 'jose';
import { SessionPayload } from './definitions';
import { cookies } from 'next/headers';

const secretKey = process.env.SESSION_TOKEN;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function verifySession(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload;
  } catch (error) {
    console.log('Failed to verify session')
  }
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, expiresAt })
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

export async function getUsersId() {
  const cookieStore = await cookies();

  const session = cookieStore.get('session');
  if (!session)
    return -1;
  const sessionValue = await jwtDecrypt(session.value, encodedKey);
  console.log(sessionValue.payload);
}
