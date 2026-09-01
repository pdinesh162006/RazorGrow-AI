import { SignJWT, jwtVerify } from 'jose';
import { env } from './env';

const secret = new TextEncoder().encode(env.JWT_SECRET);

export async function signToken(payload: any, expiresIn: string) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}
